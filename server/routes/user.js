import express from 'express';
import validator from "validator";
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
const router = express.Router();

const USERNAME_MIN_LENGTH = 5;
const PASSWORD_MIN_LENGTH = 8;

router.post("/register", async (req, res) => {
    if (!req.body) {
        return res.json({ success: false, message: "Please send information to register with." });
    }
    let { username, password, email } = req.body;
    try {
        if (typeof username !== 'string' || !/^[a-zA-Z\d_]+$/.test(username) || username.length < USERNAME_MIN_LENGTH) {
            return res.json({ success: false, message: `Username must be at least ${USERNAME_MIN_LENGTH} characters with only letters, numbers, and underscores.`});
        } else if (typeof password !== 'string' || !/^(?=.*[A-Z])(?=.*\d)(?=.*[\.!?])[a-zA-Z\d\.!@$%_\?]+$/.test(password) || password.length < PASSWORD_MIN_LENGTH) {
            return res.json({ success: false, message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters with at least one uppercase letter, one digit, and one symbol.`});
        } else if (typeof email !== 'string' || !validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email."});
        }
        let passwordHash = await bcrypt.hash(password, 12);
        let user = new User({username, email, password: passwordHash});
        user.save((err) => {
            if (err) {
                console.log(err);
                if (err.errors) {
                    if (err.errors.username && err.errors.username.kind === 'unique') {
                        return res.json({ success: false, message: "A user with that username already exists." });
                    } else if (err.errors.email && err.errors.email.kind === 'unique') {
                        return res.json({ success: false, message: "A user with that email already exists." });
                    }
                } else {
                    throw err;
                }
            } else {
                return res.json({ success: true, message: "Registered successfully. Please sign in."});
            }
        });
        
    } catch (err) {
        console.log(err);
        return res.json({ success: false, message: "An error occurred while registering." });
    }
});

router.post("/login", async (req, res) => {
    if (!req.body) {
        return res.json({success: false, message: "Please send information to login with."});
    }
    let { username, password } = req.body;
    try {
        if (typeof username !== 'string' || typeof password !== 'string') {
            return res.json({success: false, message: "Invalid login parameters."});
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.json({success: false, message: "Incorrect username or password."});
        }
        const pwdCorrect = await bcrypt.compare(password, user.password);
        if (!pwdCorrect) {
            return res.json({success: false, message: "Incorrect username or password."});
        } else {
            const authToken = jwt.sign({
                username: user.username,
                email: user.email,
                signedIn: true
            }, process.env.JWT_SECRET, {
                expiresIn: 86400
            });
            return res.json({success: true, authToken: authToken, message: "Login successful." });
        }
    } catch (err) {
        console.log(err);
        return res.json({success: false, message: "An error occured during login."});
    }
});

export default router;