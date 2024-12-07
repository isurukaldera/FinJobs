import express from "express";
import isAuthenticated from "../Middle/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../Control/Application.control.js";
 

const router = express.Router();

router.route("/apply/:id").post(applyJob);
router.route("/get").get(getAppliedJobs);
router.route("/:id/applicants").get(getApplicants);
router.route("/status/:id/update").post(updateStatus);


 

export default router;














