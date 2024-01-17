import { Router } from "express";
import {registerUser, loginUser, getUser, changeAvatar, editUser, getUsers} from "../controllers/userControllers"
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/:id', getUser)
router.get('/', getUsers)
router.post('/change-avatar', authMiddleware, changeAvatar)
router.patch('/edit-user', authMiddleware, editUser)


export default router;
