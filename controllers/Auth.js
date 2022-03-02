import otpGenerator from "otp-generator";
import OTP from "../models/Otp.js";
import User from "../models/User.js";
import { encode } from "../middlewares/crypt.js";
import nodemailer from "nodemailer";
import { verify_message, verify_subject_mail } from "../templates/email-verification.js";
import { login_message, login_subject_mail } from "../templates/email-login.js";



//login
export const login = async (req, res) => {
    var type = "";
    try {
        const email_id = req.body.email;

        //if email is empty or null throw error
        if (!email_id || email_id == "") {
            const response = { "Status": "Failure", "Reason": "Email cannot be blank" }
            return res.status(400).send(response)
        }


        //check if email already exists in db
        User.findOne({ email: req.body.email }, function (err, user) {
            if (err) {
                //db error
                const response = { "Status": "Failure", "Reason": "Server error please try after sometime" }
                return res.status(400).send(response)

            }

            //if a user was found, that means the user's email matches the entered email
            if (user) {
                //setting the type of operation as LOGIN
                type = "LOGIN"
            } else {
                const user = new User({ email: req.body.email });
                user.save();

                //setting the type of operation as VERIFY(user verification)
                type = "VERIFY"
            }
        });
        ////////////////////////////////////


        //Generate OTP 
        const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
        const now = new Date();
        const expiration_time = AddMinutesToDate(now, 10);
        console.log("This is otp", otp);

        //Create OTP instance in DB
        const otp_instance = await OTP.create({
            otp: otp,
            expiresAt: expiration_time
        });

        // Create details object containing the email and otp id
        var details = {
            "timestamp": now,
            "email": email_id,
            "success": true,
            "message": "OTP sent to user",
            "otp_id": otp_instance.id
        }
        console.log("otp", otp_instance);

        // Encrypt the details object
        const encoded = await encode(JSON.stringify(details))


        var email_message, email_subject;


        //Choosing the message template based on type of request
        if (type) {
            console.log("This is a ", type)
            if (type == "VERIFY") {

                email_message = verify_message(otp);
                email_subject = verify_subject_mail;
            }

            else if (type == "LOGIN") {

                email_message = login_message(otp);
                email_subject = login_subject_mail;

            }
            else {
                const response = { "Status": "Failure", "Reason": "Incorrect Type Provided" }
                return res.status(400).send(response)
            }
        }

        // Create nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: `${process.env.EMAIL_ID}`,
                pass: `${process.env.EMAIL_PASSWORD}`
            }
        });

        //Verify whether login is succesfull
        transporter.verify((error, success) => {
            if (error) {
                console.log("Email validation failed");
            }
            else {
                console.log("Ready to send the mails");
            }
        });


        // creating the mail
        const mailOptions = {
            from: `"no-reply-@SocialMedia"<${process.env.EMAIL_ID}>`,
            to: `${email_id}`,
            subject: email_subject,
            text: email_message,
        };

        await transporter.verify();

        //Send Email
        await transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                return res.status(400).send({ "Status": "Failure", "Reason": err });
            } else {

                return res.send({ "Status": "Success", "Reason": encoded });
            }
        });
        return res.send({ "Status": "Success", "key": encoded });
    }

    catch (err) {
        const response = { "Status": "Failure", "Reason": err.message }
        return res.status(400).send(response)
    }



};

export const logout = async (req, res) => {
    res.clearCookie('token');
    return res.send({ "Status": "Success", "Details": "Logout successful" });
};

// To add minutes to the current time
function AddMinutesToDate(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}
