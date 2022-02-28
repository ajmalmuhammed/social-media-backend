import express from 'express';
import {verifyOTP} from '../controllers/verify-otp.js'

const router = express.Router();


router.post('/verify', verifyOTP);


export default router;

