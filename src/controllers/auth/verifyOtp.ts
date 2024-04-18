import User from "@/models/user";

const verifyOtpHandler = async (req: any, res: any) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send({ error: "No user found" });

    if (!user.verificationCode || !user.verificationCodeExpiry)
      return res.status(400).send({ error: "Unauthorized access code-N/A" });

    if (user.verificationCode !== req.body.otp)
      return res.status(400).send({ error: "Invalid otp code" });

    if (Date.now() > user.verificationCodeExpiry)
      return res.status(400).send({ error: "The code you entered is expired" });

    return res.status(200).send();
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default verifyOtpHandler;
