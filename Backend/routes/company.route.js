import express from 'express';
import isAuthenticated from "../Middle/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../Control/Company.control.js";
import { singleUpload } from '../Middle/multer.js';

const router = express.Router(); 


router.route("/register").post(registerCompany); 


router.route("/get").get(getCompany); 


router.route("/get/:id").get(getCompanyById); 

router.route("/update/:id").put(singleUpload, updateCompany); 

export default router;

