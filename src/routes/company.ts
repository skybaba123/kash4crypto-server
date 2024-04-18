import { Router } from "express";
import getCompanyDataHandler from "@/controllers/company/getCompanyData";
import updateCompanyHandler from "@/controllers/company/updateCompany";
import userAuth from "@/middlewares/userAuth";
import contactUsHandler from "@/controllers/company/contactUs";

const router = Router();

router.post("/company", getCompanyDataHandler);

router.post("/company/update", userAuth, updateCompanyHandler);

router.post("/company/contact-us", contactUsHandler);

export default router;
