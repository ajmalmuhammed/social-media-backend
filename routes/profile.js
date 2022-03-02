import express from 'express';
import { addProfileDetails } from '../controllers/profile.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
const router = express.Router();


router.post('/profile',isLoggedIn, addProfileDetails);


export default router;

