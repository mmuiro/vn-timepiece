import express from "express";
import VNDB from "vndb-api";
import redis from "redis";
import dotenv from "dotenv";
const router = express.Router();
dotenv.config();
const redisClient = redis.createClient({ 
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});
await redisClient.connect();
console.log("redis client connected");

const DEFAULT_EXP = 3600;

router.get('/fetch', async (req, res) => {
    try {
        let { searchQuery, page } = req.query;
        page = parseInt(page);
        if (typeof searchQuery !== 'string' || typeof page !== 'number') {
            return res.json({ success: false, message: "Please use valid search parameters." });
        }
        let data = await redisClient.get(JSON.stringify(req.query));
        let more, items;
        if (data) {
            ({ more, items } = JSON.parse(data));
        } else {
            const client = new VNDB('vntp');
            let response = await client.query(`get vn basic,details (search~"${searchQuery}") {"page": ${page}}`);
            redisClient.setEx(JSON.stringify(req.query), DEFAULT_EXP, JSON.stringify(response));
            ({ more, items } = response);
            client.destroy();
        }
        res.json({ more: more, results: items, success: true });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "An error occured in processing your request." });
    }
});

export default router;
