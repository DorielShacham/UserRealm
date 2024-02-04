import { Router } from "express";
import { createPost, getPosts, getLimitedPosts, getPost, getCatPosts, getUserPosts, editPost, deletePost, likePost } from '../controllers/postControllers';
import { authMiddleware } from "../middleware/authMiddleware";
import { protect } from "../middleware/likesMiddleware"

const router = Router();


router.post('/', authMiddleware , createPost);
router.get('/', getPosts);
router.get('/limited', getLimitedPosts);
router.get('/:id', getPost);
router.get('/categories/:category', getCatPosts);
router.get('/users/:id', getUserPosts);
router.patch('/:id', authMiddleware , editPost);
router.delete('/:id',authMiddleware , deletePost);
router.post('/:postId/like',protect , likePost); 
    


export default router;