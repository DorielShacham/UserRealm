import { HttpError } from "../models/errorModel";

const adminMiddleware = (req, res, next) => {
    const user = req.user;

    if (!user || user.role !== 'admin') {
        return next(new HttpError("Unauthorized, not an admin", 403));
    }
    next();
};

export { adminMiddleware };
