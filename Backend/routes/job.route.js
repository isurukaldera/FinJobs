import express from "express";
import isAuthenticated from "../Middle/isAuthenticated.js";
import { postJob, getAllJobs, getAdminJobs, getJobById } from "../Control/Job.control.js";

const router = express.Router();

router.post("/post", isAuthenticated, (req, res, next) => {
    console.log("Route: /post", "Body:", req.body);
    next();
}, postJob);

router.get("/get", (req, res, next) => {
    console.log("Route: /get", "Query:", req.query);
    next();
}, getAllJobs);

router.get("/getadminjobs", isAuthenticated, (req, res, next) => {
    console.log("Route: /getadminjobs");
    next();
}, getAdminJobs);

router.get("/get/:id", isAuthenticated, (req, res, next) => {
    console.log("Route: /get/:id", "Params:", req.params);
    next();
}, getJobById);

export default router;