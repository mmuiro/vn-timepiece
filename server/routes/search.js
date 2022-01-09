import express from "express";
import VNDB from "vndb-api";
const router = express.Router();

router.get('/fetch', async (req, res) => {
    let { searchQuery, page } = req.query;
    page = parseInt(page);
    if (typeof searchQuery !== 'string' || typeof page !== 'number') {
        return res.json({ success: false, message: "Please use valid search parameters." });
    }
    const client = new VNDB('vntp');
    try {
        let response = await client.query(`get vn basic,details (search~"${searchQuery}") {"page": ${page}}`);
        let { more, items } = response;
        res.json({ more: more, results: items, success: true });
    } catch (err) {
        console.log(err);
        res.json({ success: false });
    }
    client.destroy();
});

export default router;