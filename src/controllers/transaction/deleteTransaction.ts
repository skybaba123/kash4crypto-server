import ImageTrash from "@/models/imageTrash";
import Transaction from "@/models/transaction";
import User from "@/models/user";

const deleteTransactionHandler = async (req: any, res: any) => {
  try {
    const transaction = await Transaction.findById(req.body.transactionId);
    if (!transaction)
      return res.status(404).send({ error: "Transaction not found" });

    const requester = await User.findById(req.user._id);
    if (!requester)
      return res.status(404).send({ error: "No User:Requester Found" });

    if (requester.role !== "admin")
      return res.status(400).send({ error: "Unauthorized access:" });

    if (transaction.paymentProof.secure_url) {
      //store payment proof in image trash
      const newImageTrash = new ImageTrash({
        label: "Deleted payment proof from transaction",
        location: "transaction",
        locationId: transaction._id,
        image: transaction.paymentProof,
      });
      await newImageTrash.save();
    }

    if (transaction.payoutProof.secure_url) {
      //store payout proof in image trash
      const newImageTrash = new ImageTrash({
        label: "Deleted payout proof from transaction",
        location: "transaction",
        locationId: transaction._id,
        image: transaction.payoutProof,
      });
      await newImageTrash.save();
    }

    const deletedTransaction = await Transaction.findByIdAndDelete(
      transaction._id
    );
    return res.status(200).send(deletedTransaction);
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

export default deleteTransactionHandler;
