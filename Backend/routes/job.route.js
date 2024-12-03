import express from "express";
import isAuthenticated from "../Middle/isAuthenticated.js";
import { postJob, getAllJobs, getAdminJobs, getJobById } from "../Control/Job.control.js";


const router = express.Router();

router.route("/post").post(postJob);
router.route("/get").get(getAllJobs);
router.route("/getadminjobs").get(getAdminJobs);
router.route("/get/:id").get(getJobById);

export default router;

