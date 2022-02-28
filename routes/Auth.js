import express from 'express';
import {login} from '../controllers/auth.js'
import {home} from '../controllers/Home.js';

const router = express.Router();


router.post('/login', login);
router.get('/',home);

export default router;

