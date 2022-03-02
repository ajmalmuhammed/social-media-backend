import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createPost, deletePost, likePost } from '../controllers/posts.js';

const router = express.Router();


router.post('/post', isLoggedIn, createPost );
router.put('/like/:id',isLoggedIn, likePost);
router.delete('/delete/:id',isLoggedIn, deletePost);


export default router;
