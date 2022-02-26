const express = require("express");
const { default: mongoose } = require("mongoose");

const app = express();


mongoose.connect("mongodb://localhost:dbuser:abcd@123:27017",
{useNewUrlParser: true},()=>{
    console.log("Mongo connected");
}
);
app.listen(8000,()=>{
    console.log("Backend has started");
});

