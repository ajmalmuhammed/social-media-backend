
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    firstName:{
        type: String,
        require: true,
        min: 2,
        max: 20,
        unique: true,
      },
      lastName:{
        type: String,
        require: true,
        min: 2,
        max: 20,
        unique: true,
      },
    
      email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
      },

    isVerified:{
        type:Boolean,
        default:false
    }

});

 
module.exports = mongoose.model('User', UserSchema);