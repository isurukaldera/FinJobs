import express from "express";
import isAuthenticated from "../Middle/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../Control/Application.control.js";
 

const router = express.Router();

router.route("/apply/:id").post(isAuthenticated, applyJob);
const { jobId } = req.params;
    // Validate and process the jobId here
    if (!jobId) {
        return res.status(404).send({ success: false, message: 'Job not found' });
    }
 
router.route("/get").get(isAuthenticated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);


 

export default router;














