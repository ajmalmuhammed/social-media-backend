
import express from 'express';

import db from './config/db.js';
import dotenv from "dotenv";
import authRoutes from './routes/auth.js';
import verifyRoutes from './routes/verify-otp.js';
import bodyParser from "body-parser";



dotenv.config();
const app = express();
const port = process.env.SERVER_PORT || 8089;


// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/api',authRoutes);
app.use('/api',verifyRoutes);

app.listen(port,()=>{
    console.log("Server has started on ",port);
});

