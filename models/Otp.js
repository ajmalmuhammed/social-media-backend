import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OtpSchema = new Schema({

    otp: {
        type: String
    },

    expiresAt: {
        type: Date,
        default: Date.now()
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },
    
    isVerified:{
        type:Boolean,
        default:false
    }

});


export default mongoose.model('OTP', OtpSchema) ;