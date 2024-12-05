import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./DataU/DB.js";
import userRouter from "./routes/user.route.js";
import companyRoutes from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import helmet from "helmet";  // For security
import rateLimit from "express-rate-limit";  // For rate limiting

dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());  // Security headers

// Rate limiter (e.g., limit to 100 requests per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
});

app.use(limiter); // Apply rate limiting globally

// CORS options
const corsOption = {
    origin: process.env.CLIENT_ORIGIN || 'https://finjobs.onrender.com',
    credentials: true,
};

app.use(cors(corsOption));

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);  // Log the error stack for debugging
    res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later.",
    });
});

// Connect to database and start server
const startServer = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);  // Exit the process if DB connection fails
    }
};

startServer();
