import express from "express";
import VNDB from "vndb-api";
const router = express.Router();

router.get('/fetch', async (req, res) => {
    const { searchQuery, page } = req.query;
    console.log(searchQuery)
    const client = new VNDB('vntp');
    try {
        let response = await client.query(`get vn basic,details (search~"${searchQuery}") {"page": ${page}}`);
        let { more, items } = response;
        console.log(items);
        res.json({ more: more, results: items, success: true });
    } catch (err) {
        console.log(err);
        res.json({ success: false });
    }
    client.destroy();
    console.log("client destroyed.");
});

export default router;