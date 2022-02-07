import express from 'express';
import validator from "validator";
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import VNReadingEntry from '../models/VNReadingEntry.js';
import History from '../models/History.js';
import jwt from 'jsonwebtoken';
import { checkSignedIn } from '../src/middleware/auth.js';
const router = express.Router();

const USERNAME_MIN_LENGTH = 5;
const PASSWORD_MIN_LENGTH = 8;

const pwdCheck = (password) => (/^(?=.*[A-Z])(?=.*\d)(?=.*[\.!@$%*&_#^\?])[a-zA-Z\d\.!@$%*&_#^\?]+$/.test(password) && password.length >= PASSWORD_MIN_LENGTH);

router.post("/register", async (req, res) => {
    if (!req.body) {
        return res.json({ success: false, message: "Please send information to register with." });
    }
    let { username, password, email } = req.body;
    try {
        if (typeof username !== 'string' || !/^[a-zA-Z\d_]+$/.test(username) || username.length < USERNAME_MIN_LENGTH) {
            return res.json({ success: false, message: `Username must be at least ${USERNAME_MIN_LENGTH} characters with only letters, numbers, and underscores.`});
        } else if (typeof password !== 'string' || !pwdCheck(password)) {
            return res.json({ success: false, message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters with at least one uppercase letter, one digit, and one symbol.`});
        } else if (typeof email !== 'string' || !validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email."});
        }
        let passwordHash = await bcrypt.hash(password, 12);
        let user = await User.findOne({username});
        if (user) return res.json({ success: false, message: "A user with that username already exists." });
        user = await User.findOne({email});
        if (user) return res.json({ success: false, message: "A user with that email already exists." });
        user = new User({username, email, password: passwordHash});
        await user.save();
        return res.json({ success: true, message: "Registered successfully. Please sign in."});
        
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
                expiresIn: 86400 * 30
            });
            return res.json({success: true, authToken: authToken, message: "Login successful." });
        }
    } catch (err) {
        console.log(err);
        return res.json({success: false, message: "An error occured during login."});
    }
});

router.get("/profile", checkSignedIn, async (req, res) => {
    try {
        const user = req.user;
        await User.populate(user, {
            path: 'vnList'
        });
        let userData = {
            username: user.username,
            registerDate: user.registerDate,
            numVNsStarted: user.numVNsStarted,
            numVNsCompleted: user.numVNsCompleted,
            lastActiveDate: user.lastActiveDate,
            lastReadVN: user.lastReadVN,
            totalPlayTime: user.totalPlayTime
        };
        return res.json({success: true, message: "User profile retrieved successfully.", userData: userData});
    } catch(err) {
        console.log(err);
        return res.json({success: false, message: "There was an error in retrieving your profile."});
    }
});

router.get("/home", checkSignedIn, async (req, res) => {
    try {
        const user = req.user;
        await User.populate(user, {
            path: 'vnList',
            populate: {
                path: 'vn'
            }
        });
        let userData = {
            username: user.username,
            vnList: user.vnList.map(entry => { 
                let entryData = {
                    vndbID: entry.vn.vndbID,
                    title: entry.vn.title,
                    orginalTitle: entry.vn.originalTitle,
                    imageLink: entry.vn.imageLink,
                    imageNSFW: entry.vn.imageNSFW,
                    addedDate: entry.addedDate,
                    started: entry.started,
                    completed: entry.completed,
                    playTime: entry.playTime,
                    playStatus: entry.playStatus
                };
                if (entry.started) entryData.startDate = entry.startDate;
                if (entry.completed) entryData.completeDate = entry.completeDate;
                if (entry.lastModifiedDate) entryData.lastModifiedDate = entry.lastModifiedDate;
                return entryData;
            })
        };
        return res.json({success: true, message: "User reading data retrieved successfully.", userData});
    } catch (err) {
        console.log(err);
        return res.json({success: false, message: "There was an error in processing your request."});
    }
});

router.get("/history", checkSignedIn, async (req, res) => {
    try {
        const user = req.user;
        const history = await History.findOne({user: user._id}).populate({
            path: 'actionList',
            populate: {
                path: 'vnApplied'
            }
        }).exec();
        if (!history) {
            return res.json({success: true, message: "You have no history to retrieve. Please start reading to add to your history.", actionList: []});
        }
        const actionList = history.actionList.map(action => {
            return {
                title: action.vnApplied.title,
                type: action.type,
                date: action.date,
                originalPlayTime: action.originalPlayTime,
                modifiedPlayTime: action.modifiedPlayTime,
                readingTime: action.readingTime
            };
        });
        return res.json({success: true, message: "Successfully retrieved user history.", actionList});
    } catch (err) {
        console.log(err);
        return res.json({success: false, message: "There was an error in processing your request."});
    }
});

router.post("/changePassword", checkSignedIn, async (req, res) => {
    if (!req.body) return res.json({success: false, message: "Please send valid data."});
    let { password, newPassword } = req.body;
    if (typeof password !== 'string' || typeof newPassword !== 'string') return res.json({success: false, message: "Invalid parameters."});
    if (!pwdCheck(newPassword)) return res.json({success: false, message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters with at least one uppercase letter, one digit, and one symbol.`});
    const user = req.user;
    try {
        const pwdCorrect = await bcrypt.compare(password, user.password);
        if (pwdCorrect) {
            let newPasswordHash = await bcrypt.hash(newPassword, 12);
            user.password = newPasswordHash;
            await user.save();
            return res.json({success: true, message: "Your password was updated."});
        } else { return res.json({success: false, message: "Incorrect password."}); }
    } catch (err) {
        console.log(err);
        return res.json({success: false, message: "An error occurred while processing your request."});
    }
});

router.get("/auth", async (req, res) => {
    return await checkSignedIn(req, res, () => {
        return res.json({success: true, message: "You are signed in.", username: req.user.username, email: req.user.email });
    });
});


export default router;