import jwt from 'jsonwebtoken';

export const isLoggedIn = (req, res, next) => {
    if (!req.cookies || !req.cookies.token) {
        const response = { "Status": "Failure", "Reason": "Please login first" }
        return res.status(400).send(response)
    }
    try {
        const user = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        const { firstName, lastName, email_id } = user;
        req.user = { firstName, lastName, email_id };
    } catch (error) {
        const response = { "Status": "Failure", "Reason": "Bad Request" }
        return res.status(400).send(response)
    }
    next();
};