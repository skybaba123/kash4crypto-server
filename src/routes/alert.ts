import createAlertHandler from "@/controllers/alert/createAlert";
import deleteAlertHandler from "@/controllers/alert/deleteAlert";
import getUserAlertsHandler from "@/controllers/alert/getUserAlerts";
import userAuth from "@/middlewares/userAuth";
import { Router } from "express";

const router = Router();

router.post("/alert/create", userAuth, createAlertHandler);

router.post("/alerts/user", userAuth, getUserAlertsHandler);

router.post("/alert/delete", userAuth, deleteAlertHandler);

export default router;
