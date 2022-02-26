require('dotenv').config();

const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_DB_URL,
    { useNewUrlParser: true }) 
    .then(()=>{
        console.log("Mongo connected");
    })
    .catch((err) => console.log(err));