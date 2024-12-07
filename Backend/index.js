import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"; // Only one import for CORS is needed
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
app.use(cors({
  origin: "https://finjobs.onrender.com", // Frontend URL
  credentials: true, // Allow sending cookies
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow Authorization header
}));

const PORT = process.env.PORT || 8000;

// API Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Error Handling
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
