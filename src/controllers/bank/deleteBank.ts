import Bank from "@/models/bank";
import User from "@/models/user";

const deleteBankHandler = async (req: any, res: any) => {
  try {
    const requester = await User.findById(req.user._id);
    if (!requester)
      return res.status(404).send({ error: "User(requester) not found" });

    if (requester.role !== "admin")
      return res.status(401).send({ error: "Unauthorized access" });

    const bank = await Bank.findById(req.body.bankId);
    if (!bank) return res.status(404).send({ error: "Bank not found" });

    const user = await User.findById(bank.ownerId);
    if (!user) return res.status(404).send({ error: "User not found" });

    const userBankAccounts = await Bank.find({ ownerId: user._id });

    if (bank.defaultAccount === "yes" && userBankAccounts.length > 1) {
      const msg =
        "Default account cannot be deleted. Set a different account as default, then try deleting again";
      return res.status(400).send({ error: msg });
    }

    const deletedAccount = await Bank.findByIdAndDelete(bank._id);
    return res.status(200).send(deletedAccount);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default deleteBankHandler;
