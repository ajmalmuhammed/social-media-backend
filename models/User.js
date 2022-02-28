
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    firstName:{
        type: String,
        min: 2,
        max: 20,
        unique: true,
      },
      lastName:{
        type: String,
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

 
export default mongoose.model('User', UserSchema);