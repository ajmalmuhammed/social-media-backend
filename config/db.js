// require('dotenv').config();
import dotenv from "dotenv";


import mongoose from "mongoose";

// set root path
dotenv.config();


const db = mongoose.connect(process.env.MONGO_DB_URL,
    { useNewUrlParser: true }) 
    .then(()=>{
        console.log("Mongo connected");
    })
    .catch((err) => console.log(err));

export default db;