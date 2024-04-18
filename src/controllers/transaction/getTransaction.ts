import Transaction from "@/models/transaction";
import User from "@/models/user";

const getTransactionHandler = async (req: any, res: any) => {
  try {
    const transaction = await Transaction.findById(req.body.transactionId);
    if (!transaction)
      return res.status(404).send({ error: "Transaction not found" });

    const requester = await User.findById(req.user._id);
    if (!requester)
      return res.status(404).send({ error: "No User:Requester Found" });

    const user = await User.findById(transaction.ownerId);
    if (!user) return res.status(404).send({ error: "No User Found" });

    if (
      requester._id.toString() !== user._id.toString() &&
      requester.role !== "admin"
    )
      return res.status(400).send({ error: "Unauthorized access" });

    const dateInMilisec =
      new Date(`${transaction.createdAt}`).getTime() + 1000 * 60 * 30;

    if (Date.now() > dateInMilisec && transaction.status === "waiting") {
      await Transaction.findByIdAndUpdate(transaction._id, {
        status: "expired",
      });
      const expiredTransaction = await Transaction.findById(transaction._id);
      return res.status(200).send(expiredTransaction);
    }

    return res.status(200).send(transaction);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default getTransactionHandler;
