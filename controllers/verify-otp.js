import { decode } from "../middlewares/crypt.js";
import OTP from "../models/Otp.js";

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


        // compare email
        if (email_obj != email) {
            const response = { "Status": "Failure", "Reason": "Wrong OTP entered. Please try with valid one" }
            return res.status(400).send(response)
        }

        //finding the otp from the db using id
        const otpFromDB = await OTP.findOne({ where: { id: obj.otp_id } })
        console.log("This" + otpFromDB);


        //Check if OTP is present in the Database
        if (otpFromDB != null) {

            //Check if OTP is already verified
            if (otpFromDB.verified != true) {
                console.log("Check", compareDates(otpFromDB.expiresAt, currentdate));
                //Check if OTP is expired 
                if (compareDates(otpFromDB.expiresAt, currentdate) == 1) {

                    //comparing both the otps
                    if (otp === otpFromDB.otp) {
                        otpFromDB.verified = true
                        otpFromDB.save()
                        const response = { "Status": "Success", "Reason": "OTP Matched", "Email": email }
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
                const response = { "Status": "Failure", "Reason": "OTP Already Used" }
                return res.status(400).send(response)
            }
        }
        else {
            const response = { "Status": "Failure", "Reason": "Bad Request" }
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