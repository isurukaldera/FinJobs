import express from 'express';
import isAuthenticated from "../Middle/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../Control/Company.control.js";

const router = express.Router(); 

router.route("/register").post(isAuthenticated, getCompany);
router.route("/get").post(isAuthenticated, getCompanyById);
router.route("/get/:id").get(isAuthenticated, registerCompany);
router.route("/update/:id").post(isAuthenticated, updateCompany);

export default router;

