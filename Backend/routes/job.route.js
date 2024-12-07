import express from "express";
import isAuthenticated from "../Middle/isAuthenticated.js";
import { postJob, getAllJobs, getAdminJobs, getJobById } from "../Control/Job.control.js";

 
const router = express.Router();

router.route("/post").get(postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get( getJobById);

export default router;

