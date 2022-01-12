import express from "express";
import User from "../models/User.js";
import VN from "../models/VN.js";
import Action from "../models/Action.js";
import History from "../models/History.js";
import VNReadingEntry from "../models/VNReadingEntry.js";
import { checkSignedIn } from "../src/middleware/auth.js";
const router = express.Router();

router.post("/addAction", checkSignedIn, async (req, res) => {
    if (!req.body) {
        return res.json({success: false, message: "Please provide a valid action."});
    }
    try {
        let { vndbID, type } = req.body,
            user = req.user;
        const vn = await VN.findOne({ vndbID });
        let currentDate = new Date();
        if (!vn) return res.json({success: false, message: "Please add that VN first."});
        const vnReadingEntry = await VNReadingEntry.findOne({vn: vn._id, user: user._id});
        if (!vnReadingEntry) return res.json({success: false, message: "Please add that VN first."});
        let newAction = new Action({ type, vnApplied: vn, readingEntry: vnReadingEntry, date: currentDate });
        const typeCheckerError = new Error('Invalid action. Check if you have already started/completed that VN.');
        switch (type) {
            case 'Start':
                if (!vnReadingEntry.started) { 
                    vnReadingEntry.started = true;
                    vnReadingEntry.startDate = currentDate;
                } else { throw typeCheckerError; }
                break;
            case 'Completion':
                if (vnReadingEntry.started && !vnReadingEntry.completed) {
                    vnReadingEntry.completed = true;
                    vnReadingEntry.completeDate = currentDate;
                } else { throw typeCheckerError; }
                break;
            case 'Reading':
                if (vnReadingEntry.started && !vnReadingEntry.completed) {
                    let readingTime = parseInt(req.body.readingTime);
                    newAction.readingTime = readingTime;
                    vnReadingEntry.playTime += readingTime;
                } else { throw typeCheckerError; }
            case 'Modification':
                if (vnReadingEntry.started) {
                    let modifiedPlayTime = parseInt(req.body.modifiedPlayTime);
                    if (modifiedPlayTime < 0) return res.json({success: false, message: "Please provide a valid action."});
                    newAction.originalPlayTime = vnReadingEntry.playTime;
                    newAction.modifiedPlayTime = modifiedPlayTime;
                    vnReadingEntry.playTime = modifiedPlayTime;
                } else { throw typeCheckerError; }
                break;
            case 'CompletionReversion':
                if (vnReadingEntry.completed) {
                    vnReadingEntry.completed = false;
                    vnReadingEntry.completeDate = undefined;
                } else { throw typeCheckerError; }
                break;
            default:
                return res.json({success: false, message: "Please provide a valid action."});
        }
        vnReadingEntry.lastModifiedDate = currentDate;
        if (!user.history) {
            user.history = new History({user});
        } else {
            await User.populate(user, {
                path: "history"
            });
        }
        user.history.actionList.push(newAction);
        await vnReadingEntry.save();
        await newAction.save();
        await user.history.save();
        await user.save();
        return res.json({success: true, message: "Action successfully added."});
    } catch (err) {
        console.log(err);
        return res.json({success: false, message: "An error occurred in processing your request."});
    }
});

router.get("/view", checkSignedIn, async(req, res) => {
    // retrieve data on play time, etc. for rendering the view page
});

export default router;