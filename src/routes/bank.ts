import createBankHandler from "@/controllers/bank/createBank";
import deleteBankHandler from "@/controllers/bank/deleteBank";
import getAllBanksHandler from "@/controllers/bank/getAllBanks";
import getUserBanksHandler from "@/controllers/bank/getUserBanks";
import getBankHandler from "@/controllers/bank/getbank";
import makeDefaultHandler from "@/controllers/bank/makeDefault";
import updateBankHandler from "@/controllers/bank/updateBank";
import userAuth from "@/middlewares/userAuth";
import { Router } from "express";

const router = Router();

router.post("/bank/create", userAuth, createBankHandler);

router.get("/banks", userAuth, getAllBanksHandler);

router.post("/banks/user", userAuth, getUserBanksHandler);

router.post("/bank", userAuth, getBankHandler);

router.post("/bank/make-default", userAuth, makeDefaultHandler);

router.post("/bank/update", userAuth, updateBankHandler);

router.post("/bank/delete", userAuth, deleteBankHandler);

export default router;
