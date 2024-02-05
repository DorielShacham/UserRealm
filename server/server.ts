import express, { urlencoded} from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
dotenv.config();
import upload from 'express-fileupload';
import userRoutes from "./API/routes/userRoutes";
import postRoutes from "./API/routes/postRoutes";
import { errorHandler, notFound } from "./API/middleware/errorMiddleware";
import bodyParser from "body-parser";

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

app.use(bodyParser.json({ limit: "5mb" }));
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:true}));
console.log("CORS origin:", process.env.NODE_ENV === 'production' ? process.env.CLIENT_PROD_URL : process.env.CLIENT_DEV_URL);
app.use(cors({
  credentials: true,
  origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT_PROD_URL : process.env.CLIENT_DEV_URL,
}));

app.use(upload())
// app.use('/API/uploads', express.static(__dirname + '/API/uploads'));
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is active on port : ${PORT}`);
}).on('error', (err) => {
  console.error(`Error starting server: ${err.message}`);
});
