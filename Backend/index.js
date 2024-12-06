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
app.options('*', cors()); // This handles preflight requests for all routes

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:5173', 'https://finjobs.onrender.com'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the origin
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies and credentials
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  methods: ['GET', 'POST', 'OPTIONS'], // Allow these methods


}));;

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
