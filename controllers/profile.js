import { decode } from "../middlewares/crypt.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const addProfileDetails = async (req, res) => {

    try {

        const { email_id, firstName, lastName } = req.body;

        


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