import jwt from 'jsonwebtoken';

export const isLoggedIn = (req, res, next) => {


    //throw error if cookie is null
    if (!req.cookies.token) {
        const response = { "Status": "Failure", "Reason": "Please login first" }
        return res.status(400).send(response)
    }
    try {
 
        //verify the jwt
        const user = jwt.verify(req.cookies.token, process.env.JWT_SECRET);  
        const { email, userid } = user;
        req.user = { email, userid };

    } catch (error) {
        const response = { "Status": "Failure", "Reason": "Bad Request" }
        return res.status(400).send(response)
    }
    next();
};