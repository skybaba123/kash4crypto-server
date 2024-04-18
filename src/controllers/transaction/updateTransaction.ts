import ImageTrash from "@/models/imageTrash";
import Transaction from "@/models/transaction";
import User from "@/models/user";

const updateTransactionHandler = async (req: any, res: any) => {
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
      return res.status(401).send({ error: "Unauthorized access" });

    // //only admins can update payout proof
    // if (req.body.payoutProof && requester.role !== "admin") {
    //   const msg = "Unauthorized access: Only admin can update payout proof";
    //   return res.status(400).send({ error: msg });
    // } else if (
    //   req.body.payoutProof &&
    //   transaction.payoutProof &&
    //   requester.role === "admin"
    // ) {
    //   transaction.status = "successful";
    //   //store payout proof in image trash
    //   const newImageTrash = new ImageTrash({
    //     label: "Updated payout proof from transaction",
    //     location: "transaction",
    //     locationId: transaction._id,
    //     image: transaction.payoutProof,
    //   });
    //   await newImageTrash.save();
    // }

    for (const key in req.body) {
      if (key !== "transactionId") {
        (transaction as any)[key] = req.body[key];
      }
    }

    const updatedTransaction = await transaction.save();
    return res.status(200).send(updatedTransaction);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default updateTransactionHandler;
