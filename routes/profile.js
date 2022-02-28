import express from 'express';
import { addProfileDetails } from '../controllers/profile';

const router = express.Router();


router.post('/profile', addProfileDetails);


export default router;

