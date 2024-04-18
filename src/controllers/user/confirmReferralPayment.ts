import Alert from "@/models/alert";
import Company from "@/models/company";
import User from "@/models/user";

const confirmReferralPayment = async (req: any, res: any) => {
  try {
    const companies = await Company.find({});
    if (companies.length <= 0)
      return res.status(404).send({ error: "No company data found" });
    const company = companies[0];

    const requester = await User.findById(req.user._id);
    if (!requester)
      return res.status(404).send({ error: "User(requester) not found" });

    if (requester.role !== "admin")
      return res.status(401).send({ error: "Unauthorized access" });

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(404).send({ error: "User not found" });

    if (user.referralBal < company.referral.minPayout)
      return res
        .status(400)
        .send({ error: "User does not have enough referral balance" });

    await User.findByIdAndUpdate(user._id, {
      $inc: { referralBal: -user.referralBal },
      $push: {
        referralTransaction: {
          createdAt: new Date(),
          amount: user.referralBal,
          type: "withdrawal",
        },
      },
    });

    await new Alert({
      message: `We sent ${user.referralBal} referral bonus to your bank account`,
      type: "notification",
      ownerId: user._id,
    }).save();

    return res.status(200).send();
  } catch (error) {
    return res.status({ error: error.message });
  }
};

export default confirmReferralPayment;
