import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./DataU/DB.js";
import userRouter from "./routes/user.route.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOption = {
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true 
};

app.use(cors(corsOption));

const PORT = process.env.PORT || 3000;


app.use("/api/v1/user", userRouter);

app.listen(PORT, () => {
    connectDB(); 
    console.log(`Server running at port ${PORT}`);
});
