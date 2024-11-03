import express from 'express';
import isAuthenticated from "../Middle/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../Control/Company.control.js";
import { singleUpload } from '../Middle/multer.js';

const router = express.Router(); 


router.route("/register").post(isAuthenticated, registerCompany); 


router.route("/get").get(isAuthenticated, getCompany); 


router.route("/get/:id").get(isAuthenticated, getCompanyById); 

router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany); 

export default router;

