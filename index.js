
import express from 'express';
import dotenv from "dotenv";
import authRoutes from './routes/auth.js';
import verifyRoutes from './routes/verify-otp.js';
import profileRoutes from './routes/profile.js';
import postRoutes from './routes/posts.js';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import db from './config/db.js';

dotenv.config();
const app = express();
const port = process.env.SERVER_PORT || 8089;


// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api',authRoutes);
app.use('/api',verifyRoutes);
app.use('/api',profileRoutes);
app.use('/api',postRoutes);


app.listen(port,()=>{
    console.log("Server has started on ",port);
});

