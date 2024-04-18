import generateOtp from "@/constants/generateOtp";
import User from "@/models/user";
import Company from "@/models/company";
import sendEmail from "@/constants/sendEmail";
import { render } from "@react-email/render";
import ResetPasswordEmail from "@/email/ResetPasswordEmail";

const resetPasswordOtpHandler = async (req: any, res: any) => {
  try {
    const oneHour = 3600000;
    const companies = await Company.find({});
    const company = companies[0];
    if (!company) return res.status(404).send({ error: "No user found" });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send({ error: "No user found" });

    const otp = generateOtp();
    const expiry = Date.now() + oneHour;

    user.verificationCode = otp;
    user.verificationCodeExpiry = expiry;
    await user.save();

    const emailText = `Someone recently requested a password change for your ${company.name}`;
    const htmlData = render(
      ResetPasswordEmail({
        userFirstname: user.username,
        resetPasswordCode: otp,
        company,
      })
    );

    const emailResponse = await sendEmail(
      user.email,
      "Reset Password",
      emailText,
      htmlData,
      company
    );

    if (emailResponse.status === "not-sent") {
      return res.status(400).send({ error: emailResponse.statusMessage });
    }

    return res.status(200).send();
  } catch (error) {
    return res.status(500).send({ error: error.meessge });
  }
};

export default resetPasswordOtpHandler;
