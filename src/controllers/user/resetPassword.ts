import User from "@/models/user";
import bcrypt from "bcrypt";

const resetPasswordHandler = async (req: any, res: any) => {
  try {
    const requester = req.user;
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(404).send({ error: "No user found" });

    if (
      requester._id.toString() !== user._id.toString() &&
      requester.role !== "admin"
    )
      return res.status(400).send({ error: "Unauthorized Access" });

    if (
      requester._id.toString() !== user._id.toString() &&
      user.role === "admin" &&
      requester.manager !== "yes"
    ) {
      return res
        .status(400)
        .send({ error: "Only a Manager can reset other Admins password" });
    }

    const defaultPass = "12345";

    const salt = bcrypt.genSaltSync(10);
    const newhashedPassword = bcrypt.hashSync(defaultPass, salt);

    user.hashedPassword = newhashedPassword;
    await user.save();

    return res.status(200).send({ msg: "Password Reset" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default resetPasswordHandler;
