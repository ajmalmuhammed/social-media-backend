import jwt from 'jsonwebtoken';

export const isLoggedIn = (req, res, next) => {


    //throw error if cookie is null
    if (!req.cookies.token) {
        // console.log(req.headers.cookie);
        const response = { "Status": "Failure", "Reason": "Please login first" }
        return res.status(400).send(response)
    }
    try {
 
        //verify the jwt
        const user = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        const { firstName, lastName, email_id, user_id } = user;
        req.user = { firstName, lastName, email_id, user_id };
        console.log("valid");
    } catch (error) {
        const response = { "Status": "Failure", "Reason": "Bad Request" }
        return res.status(400).send(response)
    }
    next();
};