import Transaction from "@/models/transaction";
import User from "@/models/user";

const getAllTransactionsHandler = async (req: any, res: any) => {
  try {
    const requester = await User.findById(req.user._id);
    if (!requester) return res.status(404).send({ error: "No User Found" });

    if (requester.role !== "admin")
      return res.status(400).send({ error: "Unauthorized access" });

    const transactions = await Transaction.find({});

    return res.status(200).send(transactions.reverse());
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default getAllTransactionsHandler;
