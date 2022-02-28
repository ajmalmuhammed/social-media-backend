import express from 'express';
import { addProfileDetails } from '../controllers/profile.js';

const router = express.Router();


router.post('/profile', addProfileDetails);


export default router;

