import User from "@/models/user";

const getAllUsersHandler = async (req: any, res: any) => {
  try {
    if (req.user.role !== "admin")
      return res.status(400).send({ error: "Unauthorized Access" });

    const users = await User.find({});
    return res.status(200).send(users.reverse());
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default getAllUsersHandler;
