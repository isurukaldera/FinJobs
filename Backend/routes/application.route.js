import express from "express";
import isAuthenticated from "../Middle/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../Control/Application.control.js";
 

const router = express.Router();

router.route('/api/v1/application/apply/:id', applyJob);;
router.route("/get").get(isAuthenticated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);


 

export default router;














