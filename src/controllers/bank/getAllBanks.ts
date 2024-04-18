import Bank from "@/models/bank";
import User from "@/models/user";

const getAllBanksHandler = async (req: any, res: any) => {
  try {
    const requester = await User.findById(req.user._id);
    if (!requester) return res.status(404).send({ error: "No User Found" });

    if (requester.role !== "admin")
      return res.status(400).send({ error: "Unauthorized access" });

    const banks = await Bank.find({});

    return res.status(200).send(banks.reverse());
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default getAllBanksHandler;
