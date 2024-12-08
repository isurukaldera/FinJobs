import express from "express";
import isAuthenticated from "../Middle/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../Control/Application.control.js";

const router = express.Router();

// Add debugging to the applyJob route
router.route("/apply/:id").post(isAuthenticated, async (req, res, next) => {
    try {
        console.log("Request received at /apply/:id");
        console.log("Job ID from params:", req.params.id); // Log the job ID
        console.log("User ID from middleware:", req.userId); // Log the user ID populated by isAuthenticated

        if (!req.userId) {
            console.error("User ID not found in request. Unauthorized access.");
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        next(); // Proceed to the applyJob controller
    } catch (error) {
        console.error("Error in /apply/:id route:", error);
        res.status(500).json({
            message: "An error occurred in the /apply/:id route.",
            success: false,
        });
    }
}, applyJob);

// Add debugging to other routes (optional but helpful for troubleshooting)
router.route("/get").get(isAuthenticated, async (req, res, next) => {
    console.log("Request received at /get");
    console.log("User ID from middleware:", req.userId);

    if (!req.userId) {
        return res.status(401).json({
            message: "User not authenticated",
            success: false,
        });
    }

    next();
}, getAppliedJobs);

router.route("/:id/applicants").get(isAuthenticated, async (req, res, next) => {
    console.log("Request received at /:id/applicants");
    console.log("Job ID from params:", req.params.id);
    console.log("User ID from middleware:", req.userId);

    if (!req.userId) {
        return res.status(401).json({
            message: "User not authenticated",
            success: false,
        });
    }

    next();
}, getApplicants);

router.route("/status/:id/update").post(isAuthenticated, async (req, res, next) => {
    console.log("Request received at /status/:id/update");
    console.log("Job ID from params:", req.params.id);
    console.log("User ID from middleware:", req.userId);

    if (!req.userId) {
        return res.status(401).json({
            message: "User not authenticated",
            success: false,
        });
    }

    next();
}, updateStatus);

export default router;
