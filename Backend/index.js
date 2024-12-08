import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';  // Only one import for CORS is needed
import dotenv from "dotenv";
import connectDB from "./DataU/DB.js";
import userRouter from "./routes/user.route.js";
import companyRoutes from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
  origin: ["https://finjobs.onrender.com"],
  allowedHeaders: ['Content-Type', 'Authorization'], // Frontend URL
  methods: "GET,POST,PUT,DELETE",
  credentials: true, // Allow cookies if needed
};

// Use CORS middleware
app.use(cors(corsOptions));

// Middleware to add CORS headers for every response
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://finjobs.onrender.com");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

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
