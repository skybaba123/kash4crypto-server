import approveTransactionHandler from "@/controllers/transaction/approveTransaction";
import createTransactionHandler from "@/controllers/transaction/createTransaction";
import deleteTransactionHandler from "@/controllers/transaction/deleteTransaction";
import getAllTransactionsHandler from "@/controllers/transaction/getAllTransactions";
import getTransactionHandler from "@/controllers/transaction/getTransaction";
import getUserTransactionsHandler from "@/controllers/transaction/getUserTransactions";
import rejectTransactionHandler from "@/controllers/transaction/rejectTransaction";
import updateTransactionHandler from "@/controllers/transaction/updateTransaction";
import uploadPaymentProofHandler from "@/controllers/transaction/uploadPaymentProof";
import userAuth from "@/middlewares/userAuth";
import { Router } from "express";

const router = Router();

router.post("/transaction/create", userAuth, createTransactionHandler);

router.get("/transactions", userAuth, getAllTransactionsHandler);

router.post("/transactions/user", userAuth, getUserTransactionsHandler);

router.post("/transaction", userAuth, getTransactionHandler);

router.post(
  "/transaction/upload-payment-proof",
  userAuth,
  uploadPaymentProofHandler
);

router.post("/transaction/approve", userAuth, approveTransactionHandler);

router.post("/transaction/reject", userAuth, rejectTransactionHandler);

router.post("/transaction/update", userAuth, updateTransactionHandler);

router.post("/transaction/delete", userAuth, deleteTransactionHandler);

export default router;
