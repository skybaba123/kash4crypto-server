import newActivity from "@/constants/newActivity";
import User from "@/models/user";
import bcrypt from "bcrypt";

const changePasswordHandler = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send({ error: "No user found" });

    const isCurrentPass = bcrypt.compareSync(
      req.body.currentPass,
      user.hashedPassword
    );
    if (!isCurrentPass)
      return res.status(400).send({ error: "Incorrect current password" });

    const salt = bcrypt.genSaltSync(10);
    const newhashedPassword = bcrypt.hashSync(req.body.newPass, salt);

    user.hashedPassword = newhashedPassword;
    const updatedUser = await user.save();

    await newActivity(req, updatedUser._id, "You changed your password");

    return res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default changePasswordHandler;
