import { decode } from "../middlewares/crypt.js";
import OTP from "../models/Otp.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const verifyOTP = async (req, res) => {
    try {
        var currentdate = new Date();
        const { verification_key, otp, email } = req.body;

        if (!verification_key) {
            const response = { "Status": "Failure", "Reason": "Verification key cannot be blank" }
            return res.status(400).send(response)
        }
        if (!otp) {
            const response = { "Status": "Failure", "Reason": "OTP cannot be blank" }
            return res.status(400).send(response)
        }
        if (!email) {
            const response = { "Status": "Failure", "Reason": "Email cannot be blank" }
            return res.status(400).send(response)
        }

        let decoded;

        //Get the decoded verification_key
        try {
            decoded = await decode(verification_key)
        }
        catch (err) {
            const response = { "Status": "Failure", "Reason": "Bad Request", err }
            return res.status(400).send(response)
        }

        //obj will contain the decoded informations
        var obj = JSON.parse(decoded)
        const email_obj = obj.email
        console.log(obj);

        // compare email
        if (email_obj != email) {
            const response = { "Status": "Failure", "Reason": "Use the correct otp associated with this mail" }
            return res.status(400).send(response)
        }

        //finding the otp from the db using id
        const otpFromDB = await OTP.findOne({ _id: obj.otp_id })
        console.log("This" + otpFromDB);

        const userFromDB = await User.findOne({ email: email_obj });
        console.log("uyserfrom db", userFromDB);
        //check if user is present in Database
        if (userFromDB != null) {

            //Check if OTP is present in the Database
            if (otpFromDB != null) {

                //Check if OTP is already verified
                if (otpFromDB.isVerified != true) {
                    console.log("expiresat ", otpFromDB.expiresAt, " current", currentdate);
                    console.log("Check", compareDates(otpFromDB.expiresAt, currentdate));
                    //Check if OTP is expired 
                    if (compareDates(otpFromDB.expiresAt, currentdate) == 1) {

                        //comparing both the otps
                        if (otp === otpFromDB.otp) {

                            otpFromDB.isVerified = true;
                            otpFromDB.save();


                            const userid = userFromDB.id
                            //creating a jwt cookie
                            const token = jwt.sign({ email, userid }, process.env.JWT_SECRET, {
                                expiresIn: '25 days',
                            });

                            res.cookie('token', token, {
                                httpOnly: true,
                                maxAge: 2160000000,
                                secure: process.env.ENV == 'production' ? true : false,
                            });



                            //if the user is not verified
                            if (!userFromDB.isVerified) {
                                userFromDB.isVerified = true;
                                userFromDB.save();

                                const response = { "Status": "Account verification successfull", "Email": email }
                                return res.status(200).send(response)
                            }


                            const response = {
                                "Status": "Login Success", "Email": email,
                                "First name": userFromDB.firstName, "Last name": userFromDB.lastName
                            }
                            return res.status(200).send(response)
                        }
                        else {
                            const response = { "Status": "Failure", "Reason": "OTP NOT Matched" }
                            return res.status(400).send(response)
                        }

                    }
                    else {
                        const response = { "Status": "Failure", "Reason": "OTP Expired! Please request new OTP" }
                        return res.status(400).send(response)
                    }
                }
                else {
                    const response = { "Status": "Failure", "Reason": "OTP already used! Please request new OTP" };
                    return res.status(400).send(response)
                }
            }
            else {
                const response = { "Status": "Failure", "Reason": "Bad Request" }
                return res.status(400).send(response)
            }
        }
        else {
            const response = { "Status": "Failure", "Reason": "Please signup first" }
            return res.status(400).send(response)
        }
    }
    catch (err) {
        const response = { "Status": "Failure", "Reason": err.message }
        return res.status(400).send(response)
    }


}



function compareDates(d1, d2) {

    if (d1 > d2)
        return 1;

    else
        return 0;

}