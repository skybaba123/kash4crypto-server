import resetPasswordOtpHandler from "@/controllers/auth/resetPasswordOtp";
import loginController from "@/controllers/auth/login";
import registerController from "@/controllers/auth/register";
import { Router } from "express";
import verifyOtpHandler from "@/controllers/auth/verifyOtp";
import newPasswordHandler from "@/controllers/auth/newPassword";

const router = Router();

router.post("/login", loginController);

router.post("/register", registerController);

router.post("/auth/reset-password-otp", resetPasswordOtpHandler);

router.post("/auth/verify-otp", verifyOtpHandler);

router.post("/auth/new-password", newPasswordHandler);

export default router;
