import { Request, Response, NextFunction } from "express";
import { HttpError } from "../models/errorModel";

declare global {
  namespace Express {
    interface Request {
      user?: { role: string }; 
    }
  }
}

const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user || user.role !== 'admin') {
        return next(new HttpError("Unauthorized, not an admin", 403));
    }

    next();
};

export { adminMiddleware };
