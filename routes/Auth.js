import express from 'express';
import {login, logout} from '../controllers/auth.js'
import {home} from '../controllers/Home.js';

const router = express.Router();


router.post('/login', login);
router.get('/logout',logout);

export default router;

