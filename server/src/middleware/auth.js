import jwt from 'jsonwebtoken';
import User from '../../models/User.js';

const processAuthToken = (req, res, next) => {
    const authToken = req.headers.authorization;
    if (authToken) {
        try {
            req.jwt = jwt.verify(authToken, process.env.JWT_SECRET);
        } catch {}
    }
    next();
};

const checkSignedIn = async (req, res, next) => {
    if (!req.jwt || !req.jwt.signedIn) {
        return res.json({success: false, message: "Please sign in for access."});
    }
    try {
        const user = await User.findOne({username: req.jwt.username});
        if (!user) {
            return res.json({success: false, message: "The specified user does not exist. Please sign in again."});
        }
        req.user = user;
        next();
    } catch {
        return res.json({success: false, message: "Please sign in for access."});
    }
};

export { checkSignedIn, processAuthToken };