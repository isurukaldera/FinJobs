import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"; // Only one import for CORS is needed
import dotenv from "dotenv";
import connectDB from "./DataU/DB.js";
import userRouter from "./routes/user.route.js";
import companyRoutes from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ 
  origin: "https://finjobs.onrender.com", // Your frontend URL
  credentials: true // Allow cookies and credentials
}));

const PORT = process.env.PORT || 3000;

// API Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Start Server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
