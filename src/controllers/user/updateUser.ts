import User from "@/models/user";

const updateUserHandler = async (req: any, res: any) => {
  try {
    const user = (await User.findById(req.body.userId)) as any;
    const requester = req.user;

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
        .send({ error: "Only a Manager can update other Admins" });
    }

    if (
      req.body.email &&
      user.email !== (req.body.email as string).toLowerCase()
    ) {
      const userExistbyEmail = await User.findOne({ email: req.body.email });
      if (userExistbyEmail)
        return res.status(400).send({ error: "Email already exist" });
    }

    if (
      req.body.username &&
      user.username !== req.body.username.toLowerCase()
    ) {
      const userExistbyUsername = await User.findOne({
        username: req.body.username,
      });
      if (userExistbyUsername)
        return res.status(400).send({ error: "Username already exist" });
    }

    for (const key in req.body) {
      if (key !== "userId") {
        user[key] = req.body[key];
      }
    }

    await user.save();

    return res.status(200).send({ msg: "User updated" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default updateUserHandler;
