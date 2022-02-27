import otpGenerator from "otp-generator";
import OTP from "../models/Otp.js";
import { encode } from "../middlewares/crypt.js";
import nodemailer from "nodemailer";

// import  User from "../models/User.js";



export const login = async (req, res) => {

    try {
        const email = req.body.email;

        console.log(req.body);

        //if email is empty or null throw error
        if (!email || email == "") {
            const response = { "Status": "Failure", "Details": "Email cannot be blank" }
            return res.status(400).send(response)
        }

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
            "check": email,
            "success": true,
            "message": "OTP sent to user",
            "otp_id": otp_instance.id
        }
        console.log("otp", otp_instance);

        // Encrypt the details object
        const encoded = await encode(JSON.stringify(details))
        const email_message = "This is the otp " + otp;
        const email_subject = "OTP FOR Verification";


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
            console.log("Inside transproter");
            if (error) {
                console.log("Email validation failed");
            }
            else {
                console.log("Ready to send the mails");
            }
        });


        const mailOptions = {
            from: `"no-reply-@SocialMedia"<${process.env.EMAIL_ID}>`,
            to: `${email}`,
            subject: email_subject,
            text: email_message,
        };

        await transporter.verify();

        //Send Email
        await transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                return res.status(400).send({ "Status": "Failure", "Details": err });
            } else {
                console.log('res: ', response);
                return res.send({ "Status": "Success", "Details": encoded });
            }
        });
    }

    catch (err) {
        const response = { "Status": "Failure", "Details": err.message }
        return res.status(400).send(response)
    }



};

// To add minutes to the current time
function AddMinutesToDate(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}
