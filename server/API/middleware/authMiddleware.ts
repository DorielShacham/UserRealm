import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";
import { HttpError } from "../models/errorModel";

const authMiddleware = async (req, res, next) => {
  const Authorization = req.headers.Authorization || req.headers.authorization;

  if (Authorization && Authorization.startsWith("Bearer")) {
    const token = Authorization.split(" ")[1];

    if (!process.env.JWT_SECRET) {
      return next(
        new HttpError("Internal Server Error: JWT_SECRET not defined", 500)
      );
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        return next(new HttpError("Unauthorized, invalid token", 401));
      }
      
      req.user = decodedToken;
      
      const user = await UserModel.findById(decodedToken.userId);
      if (!user) {
        return next(new HttpError("User not found", 404));
      }
      if (user.role === 'admin') {
        req.isAdmin = true;
      } else {
        req.isAdmin = false;
      }

      next();
    });
  } else {
    return next(new HttpError("Unauthorized, no token", 401));
  }
};

export { authMiddleware };
