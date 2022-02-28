
import db from "../config/db.js";
import { decode } from "../middlewares/crypt.js";
import User from "../models/User.js";


export const addProfileDetails = async (req, res) => {

    try {

        const { verification_key, email_id, firstName, lastName } = req.body;

        let decoded;
        //Get the decoded verification_key
        try {
            decoded = await decode(verification_key)
        }
        catch (err) {
            const response = { "Status": "Failure", "Reason": "Bad Request", err }
            return res.status(400).send(response)
        }


        const userInstance = await User.findOne({ email: email_id });
        console.log("UserInstance",userInstance);
        //Check if user is present in the Database
        if (userInstance != null) {
            if (userInstance.isVerified == true) {
                userInstance.firstName = firstName;
                userInstance.lastName = lastName;
                userInstance.save();
                const response={"Status":"Success", "Details":"Profile details updated"}
                return res.status(200).send(response);
            }
            else {
                const response = { "Status": "Failure", "Reason": "Please verify your account first!" }
                return res.status(400).send(response)
            }


        } else {
            const response = { "Status": "Failure", "Reason": "Please signup first" }
            return res.status(400).send(response)

        }







    }

    catch (err) {
        const response = { "Status": "Failure", "Reason": err.message }
        return res.status(400).send(response)
    }


}