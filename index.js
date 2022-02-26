require('./config/db')
const express = require("express");
const { default: mongoose } = require("mongoose");


const app = express();




app.get("/",(req,res)=>{
res.send("Helloooooooooooo");
});
app.listen(process.env.SERVER_PORT,()=>{
    console.log("Server has started");
});

