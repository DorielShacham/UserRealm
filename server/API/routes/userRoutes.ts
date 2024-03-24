import { Router } from "express";
import {registerUser, loginUser, getUser, changeAvatar, editUser, getUsers, getUserRole, deleteUser} from "../controllers/userControllers"
import { adminMiddleware } from "../middleware/adminMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/:id', getUser)
router.get('/', getUsers)
router.post('/change-avatar', authMiddleware, changeAvatar)
router.patch('/edit-user', authMiddleware, editUser)
router.get('/:id/role', authMiddleware, getUserRole);
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser);


export default router;
