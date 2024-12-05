import express from "express";
import cookieParser from "cookie-parser";
// import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./DataU/DB.js";
import userRouter from "./routes/user.route.js";
import companyRoutes from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOption = {
    origin: process.env.CLIENT_ORIGIN || 'https://finjobs.onrender.com',
    credentials: true
};

app.use(cors(corsOption));

const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});
