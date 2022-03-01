import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createPost, likePost } from '../controllers/posts.js';

const router = express.Router();


router.post('/post', isLoggedIn, createPost );
router.put('/like/:id',isLoggedIn, likePost);


export default router;
