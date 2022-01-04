import express from "express";
import dotenv from "dotenv";
import searchRouter from "./routes/search.js";

const app = express();
dotenv.config();

app.use(express.static('serve'));

app.use('/search', searchRouter);

app.get('*', (req, res) => {
    res.sendFile('index.html', { root : 'serve' });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})