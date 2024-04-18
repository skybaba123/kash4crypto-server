import Bank from "@/models/bank";
import User from "@/models/user";

const createBankHandler = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send({ error: "No user found" });

    const userBankAccounts = await Bank.find({ ownerId: user._id });

    const newBankAccount = new Bank({
      accountName: req.body.accountName,
      accountNumber: req.body.accountNumber,
      bankName: req.body.bankName,
      accountType: req.body.accountType,
      additionalDetail: req.body.additionalDetail,
      defaultAccount: userBankAccounts.length <= 0 ? "yes" : "no",
      ownerId: user._id,
    });

    const savedBankAccount = await newBankAccount.save();
    return res.status(200).send(savedBankAccount);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default createBankHandler;
