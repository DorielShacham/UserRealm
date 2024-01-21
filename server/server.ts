import express, { urlencoded} from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"

import upload from 'express-fileupload';
import puppeteer from 'puppeteer';
import userRoutes from "./API/routes/userRoutes";
import postRoutes from "./API/routes/postRoutes";
import { errorHandler, notFound } from "./API/middleware/errorMiddleware";
import { allowedOrigin } from "./config/allowedOrigin";



const app = express();

const mongodb_uri = process.env.MONGO_URI;
const PORT = process.env.PORT;

// mongoose 7 place this on false as default.
mongoose.set("strictQuery", true);

mongoose
  .connect(mongodb_uri)
  .then((res) => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("At mongoose.connect:");
    console.error(err.message);
  });

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:true}));
app.use(cors({credentials:true, origin: `${allowedOrigin}`}));
app.use(upload())
app.use('/API/uploads', express.static(__dirname + '/API/uploads'));



app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.post('/api/posts/:creatorId', async (req, res) => {
  try {
    const { creatorId } = req.params;
    const { url } = req.body;

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.goto(url);
    await new Promise(resolve => setTimeout(resolve, 5000));

    const screenshot = await page.screenshot();

    await browser.close();

    res.json({ success: true, screenshot: screenshot.toString('base64') });
  } catch (error) {
    console.error('Screenshot capture failed', error);
    res.status(500).json({ success: false, error: 'Screenshot capture failed' });
  }
});



app.use(notFound);
app.use(errorHandler);

// app.get("/check", async (req, res) => {
//   try {
//     res.send({ ok: true, message: "hello" });
//   } catch (error) {
//     res.send({ error });
//   }
// });


app.listen(PORT, () => {
  console.log(`server is active on port : ${PORT}`);
}).on('error', (err) => {
  console.error(`Error starting server: ${err.message}`);
});
