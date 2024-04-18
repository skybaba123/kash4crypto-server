import Bank from "@/models/bank";
import User from "@/models/user";

const getBankHandler = async (req: any, res: any) => {
  try {
    const bank = await Bank.findById(req.body.bankId);
    if (!bank) return res.status(404).send({ error: "Bank not found" });

    const requester = await User.findById(req.user._id);
    if (!requester)
      return res.status(404).send({ error: "No User:Requester Found" });

    const user = await User.findById(bank.ownerId);
    if (!user) return res.status(404).send({ error: "No User Found" });

    if (
      requester._id.toString() !== user._id.toString() &&
      requester.role !== "admin"
    )
      return res.status(400).send({ error: "Unauthorized access" });

    return res.status(200).send(bank);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default getBankHandler;
