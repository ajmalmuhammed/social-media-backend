import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OtpSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
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
    }

});


export default mongoose.model('OTP', OtpSchema) ;