import { decode } from "../middlewares/crypt.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

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

                const user_id = userInstance.id;
           

                //creating a jwt cookie
                const token = jwt.sign({ firstName, lastName, email_id, user_id}, process.env.JWT_SECRET, {
                    expiresIn: '25 days',
                  });
              
                  res.cookie('token', token, {
                    httpOnly: true,
                    maxAge: 2160000000,
                    secure: process.env.ENV == 'production' ? true : false,
                  });
                
                  console.log(token);
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