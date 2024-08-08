import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { HttpError } from "../models/errorModel";
import UserModel from "../models/userModel";

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
    const user = await UserModel.findById(id).select('-_id avatar name posts role');
    // const user = await UserModel.findById(id).select("-password");
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
    if (!req.body.avatar) {
      return next(new HttpError("Please choose an image", 422));
    }

    const user = await UserModel.findById(req.user.userId);

    if (!user) {
      console.error("User not found for ID:", req.user.id);
      return next(new HttpError("User not found", 404));
    }
    const newAvatar = req.body.avatar;

    if (Buffer.byteLength(newAvatar, 'base64') > 500000) {
      return next(new HttpError("Picture size too big, should be less than 500kb", 422));
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user.userId,
      { avatar: newAvatar },
      { new: true }
    );

    if (!updatedUser) {
      return next(new HttpError("Failed to update user avatar", 500));
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error while changing the avatar:", error);
    return next(new HttpError("Error while changing the avatar", 500));
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

    const user = await UserModel.findById(req.user.userId);

    if (!user) {
      return next(new HttpError("User was not found", 403));
    }

    const emailExist = await UserModel.findOne({ email });

    if (emailExist && emailExist._id.toString() !== req.user.userId) {
      return next(new HttpError("Incorrect Email", 422));
    }

    const validateUserPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!validateUserPassword) {
      return next(new HttpError("Invalid current password", 422));
    }

    if (newPassword !== confirmNewPassword) {
      return next(new HttpError("Passwords do not match.", 422));
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

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

// get user role (unprotected) - /api/users/:id/role
const getUserRole = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId); 
    
    if (!user) {
      return next(new HttpError("User not found", 404));
    }
    const { role } = user;
    res.status(200).json({ role });
  } catch (error) {
    console.error("Error getting user role:", error);
    return next(new HttpError("Error getting user role", 500));
  }
};

//delete user (protected) /api/users/:d
const deleteUser = async (req, res, next) => {
  try {
      if (req.user.role !== 'admin') {
          return next(new HttpError("Unauthorized", 401));
      }
      const { id } = req.params;
      await UserModel.findByIdAndDelete(id);
      res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
      console.error("Error deleting user:", error);
      return next(new HttpError("Error deleting user", 500));
  }
};
export { registerUser, loginUser, getUser, changeAvatar, editUser, getUsers, getUserRole, deleteUser };
