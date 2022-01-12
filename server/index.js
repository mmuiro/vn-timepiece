import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import searchRouter from "./routes/search.js";
import userRouter from "./routes/user.js";
import vnRouter from "./routes/novel.js";
import readerRouter from "./routes/reader.js";
import { processAuthToken } from "./src/middleware/auth.js";

const app = express();
dotenv.config();
mongoose.connect(process.env.MONGOOSE_DB_URL);
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected to Mongoose DB.'));

// development server only
app.use(cors({
    origin: process.env.DEVELOPMENT_FRONTEND_URL,
}))

app.use(processAuthToken);
app.use(express.json({ limit: '10mb' }));
app.use(express.static('serve'));

app.use('/api/search', searchRouter);
app.use('/api/user', userRouter);
app.use('/api/novel', vnRouter);
app.use('/api/reader', readerRouter);
app.get('*', (req, res) => {
    res.sendFile('index.html', { root : 'serve' });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})