import express from 'express';
import VN from '../models/VN.js';
import VNReadingEntry from '../models/VNReadingEntry.js';
import User from '../models/User.js';
import { checkSignedIn } from '../src/middleware/auth.js';
const router = express.Router();

router.post("/add", checkSignedIn, async (req, res) => {
    if (!req.body) {
        return res.json({success: false, message: "Please send the ID of a visual novel to add."});
    }
    try {
        const { vndbID, title, originalTitle } = req.body,
            user = req.user;
        if (!(typeof vndbID === 'string' || typeof vndbID === 'number') || typeof title !== 'string' || typeof originalTitle !== 'string') {
            return res.json({success: false, message: "Please send valid parameters."});
        }
        let vn = await VN.findOne({ vndbID });
        if (!vn) {
            // create the global VN entry
            vn = new VN({ vndbID, title });
            if (originalTitle) vn.originalTitle = originalTitle;
            await vn.save();
        }
        let readingEntry = await VNReadingEntry.findOne({ vn: vn._id, user: user._id });
        if (readingEntry) {
            return res.json({success: false, message: "You have already added that visual novel."});
        }
        readingEntry = new VNReadingEntry({ vn: vn._id, user: user._id });
        user.vnList.push(readingEntry);
        await user.save();
        await readingEntry.save();
        return res.json({success: true, message: "Successfully added to your reading list.", vndbID: vn.vndbID })
    } catch (err) {
        console.log(err);
        return res.json({success: false, message: "An error occurred in processing your request."});
    }
});

export default router;