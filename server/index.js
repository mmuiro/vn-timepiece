import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import searchRouter from "./routes/search.js";

const app = express();
dotenv.config();
// development server only
app.use(cors({
    origin: process.env.DEVELOPMENT_FRONTEND_URL,
}))
app.use(express.static('serve'));

app.use('/api/search', searchRouter);
app.get('*', (req, res) => {
    res.sendFile('index.html', { root : 'serve' });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})