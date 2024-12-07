import express from "express";
import isAuthenticated from "../Middle/isAuthenticated.js";
import { postJob, getAllJobs, getAdminJobs, getJobById } from "../Control/Job.control.js";

 
const router = express.Router();

router.route("/post").get(isAuthenticated, postJob);
router.route("/get").get(getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);

export default router;

