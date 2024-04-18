import User from "@/models/user";

const getUserReferralsHandler = async (req: any, res: any) => {
  try {
    const requester = await User.findById(req.user._id);
    if (!requester)
      return res.status(404).send({ error: "No User:Requester Found" });

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(404).send({ error: "No User Found" });

    if (
      requester._id.toString() !== user._id.toString() &&
      requester.role !== "admin"
    )
      return res.status(401).send({ error: "Unauthorized access" });

    const userReferrals = await User.find({ referralUserId: user._id });
    return res.status(200).send(userReferrals.reverse());
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default getUserReferralsHandler;
