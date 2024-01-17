import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { HttpError } from "../models/errorModel";
import UserModel from "../models/userModel";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

const jwtSecret = process.env.JWT_SECRET;

//register (unprotected)- /api/users/register
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, password2 } = req.body;
    if (!name || !email || !password) {
      return next(
        new HttpError("User registration failed, fill in all fields.", 422)
      );
    }

    const newEmail = email.toLowerCase();

    const emailExists = await UserModel.findOne({ email: newEmail });
    if (emailExists) {
      return next(new HttpError("Email already exists.", 422));
    }

    if (password.trim().length < 6) {
      return next(
        new HttpError(
          "Please provider a password with more then 6 letters.",
          422
        )
      );
    }

    if (password != password2) {
      return next(new HttpError("Passwords do not match.", 422));
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      name,
      email: newEmail,
      password: hashPassword,
    });

    res.status(201).json(`New user ${newUser.email} registered.`);
  } catch (error) {
    return next(new HttpError("User registration failed.", 422));
  }
};

//login (unprotected) - /api/users/login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new HttpError("Please fill all fields", 422));
    }

    const newEmail = email.toLowerCase();
    
    const user = await UserModel.findOne({ email: { $regex: new RegExp(newEmail, 'i') } });
    // const user = await UserModel.findOne({ email: newEmail });
    
    if (!user) {
      return next(
        new HttpError("Invalid credentials.", 422)
      );
    }
    
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return next(
        new HttpError(
          "Password does not match user password, invalid credentials.",
          422
        )
      );
    }

    const { _id: id, name } = user;

    const token = jwt.sign({ userId: id, userName: name }, jwtSecret, {
      expiresIn: "1d",
    });
    

    res.status(200).json({ userId: id, userName: name, token });
  } catch (error) {
    console.error("Login error:", error);
    return next(
      new HttpError("Login failed, please check your credentials.", 422)
    );
  }
};

//user profile (protected) - /api/users/:id
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id).select("-password");
    if (!user) {
      return next(new HttpError("User not found", 404));
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("error getting the user:", error);
    return next(new HttpError(error, 422));
  }
};

//change user avatar(protected) - /api/users/change-avatar
const changeAvatar = async (req, res, next) => {
  try {
    if (!req.files.avatar) {
      return next(new HttpError("Please choose an image", 422));
    }

    const user = await UserModel.findById(req.user.userId);

    if (!user) {
      console.error("User not found for ID:", req.user.id);
      return next(new HttpError("User not found", 404));
    }

    //check if user already have avatar
    if (user.avatar) {
      fs.unlink(path.join(__dirname, "..", "uploads", user.avatar), (err) => {
        if (err) {
          console.error("Error deleting avatar file:", err);
          return next(new HttpError(err, 403));
        }
      });
    }
    //check file size
    const { avatar } = req.files;
    if (avatar.size > 500000) {
      return next(
        new HttpError("Picture size to big, should be less then 5kb", 422)
      );
    }
    //check name of file
    let fileName;
    fileName = avatar.name;
    let splitFileName = fileName.split(".");
    let newFileName =
      splitFileName[0] + uuid() + "." + splitFileName[splitFileName.length - 1];
    avatar.mv(
      path.join(__dirname, "..", "/uploads", newFileName),
      async (err) => {
        if (err) {
          return next(new HttpError(err, 422));
        }
        const updatedAvatar = await UserModel.findByIdAndUpdate(
          req.user.userId,
          { avatar: newFileName },
          { new: true }
        );
        if (!updatedAvatar) {
          return next(
            new HttpError(
              "Avatar could not be change, issue with file name",
              422
            )
          );
        }
        res.status(200).json(updatedAvatar);
      }
    );
  } catch (error) {
    console.error("error while changing the avatar", error);
    return next(new HttpError(error, 413));
  }
};

// edit user profile (protected) - /api/users/edit-user
const editUser = async (req, res, next) => {
  try {
    const { name, email, currentPassword, newPassword, confirmNewPassword } =
      req.body;
      

    if (!name || !email || !currentPassword || !newPassword) {
      return next(new HttpError("Please fill all fields", 422));
    }

    // get user from DB based on the user ID from the token
    const user = await UserModel.findById(req.user.userId);

    if (!user) {
      return next(new HttpError("User was not found", 403));
    }

    // get email from the user id
    const emailExist = await UserModel.findOne({ email });

    if (emailExist && emailExist._id.toString() !== req.user.userId) {
      return next(new HttpError("Incorrect Email", 422));
    }

    // compare password to db password
    const validateUserPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!validateUserPassword) {
      return next(new HttpError("Invalid current password", 422));
    }

    // compare passwords
    if (newPassword !== confirmNewPassword) {
      return next(new HttpError("Passwords do not match.", 422));
    }

    // hash new password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    // update user info in the db
    const newInfo = await UserModel.findByIdAndUpdate(
      req.user.userId,
      { name, email, password: hash },
      { new: true }
    );

    res.status(200).json(newInfo);
  } catch (error) {
    console.error("Error while editing user profile", error);
    return next(new HttpError(error, 422));
  }
};

//get users (unprotected) - /api/users/users
const getUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error("error while getting users from DB", error);
    return next(new HttpError(error, 404));
  }
};

export { registerUser, loginUser, getUser, changeAvatar, editUser, getUsers };
