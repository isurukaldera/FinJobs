import express from "express";
import isAuthenticated from "../Middle/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../Control/Application.control.js";

const router = express.Router();

// Log each route hit to verify the flow
router.post("/apply/:id", isAuthenticated, (req, res, next) => {
    console.log("Route: /apply/:id", "Params:", req.params, "Body:", req.body);
    next();
}, applyJob);

router.get("/get", isAuthenticated, (req, res, next) => {
    console.log("Route: /get", "Query:", req.query);
    next();
}, getAppliedJobs);

router.get("/:id/applicants", isAuthenticated, (req, res, next) => {
    console.log("Route: /:id/applicants", "Params:", req.params);
    next();
}, getApplicants);

router.post("/status/:id/update", isAuthenticated, (req, res, next) => {
    console.log("Route: /status/:id/update", "Params:", req.params, "Body:", req.body);
    next();
}, updateStatus);

export default router;
