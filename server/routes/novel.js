import express from 'express';
import VN from '../models/VN.js';
import VNReadingEntry from '../models/VNReadingEntry.js';
import User from '../models/User.js';
import VNDB from "vndb-api";
import { checkSignedIn } from '../src/middleware/auth.js';
const router = express.Router();

router.post("/add", checkSignedIn, async (req, res) => {
    if (!req.body) {
        return res.json({success: false, message: "Please send the ID of a visual novel to add."});
    }
    try {
        let vndbID = req.body.vndbID,
            user = req.user;
        vndbID = parseInt(vndbID);
        if (!typeof vndbID === 'number') {
            return res.json({success: false, message: "Please send valid parameters."});
        }
        let vn = await VN.findOne({ vndbID });
        if (!vn) {
            const client = new VNDB('vntp');
            let vndbRes = await client.query(`get vn basic,details (id = ${vndbID})`);
            await client.destroy();
            if (vndbRes.status === 'results') {
                let entry = vndbRes.items[0];
                vn = new VN({ 
                    vndbID,
                    title: entry.title,
                });
                if (entry.original) vn.originalTitle = entry.original;
                if (entry.image) {
                    vn.imageLink = entry.image;
                    vn.imageNSFW = entry.image_nsfw;
                }
                await vn.save();
            } else { return res.json({success: false, message: "Couldn't find a visual novel with that ID."})}
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