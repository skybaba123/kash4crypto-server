import ImageTrash from "@/models/imageTrash";
import Transaction from "@/models/transaction";
import User from "@/models/user";

const uploadPaymentProofHandler = async (req: any, res: any) => {
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

    if (transaction.paymentProof.secure_url) {
      const newImageTrash = new ImageTrash({
        label: "Updated payment proof from transaction",
        location: "transaction",
        locationId: transaction._id,
        image: transaction.paymentProof,
      });
      await newImageTrash.save();
    }

    const paymentProof = {
      public_id: req.body.public_id,
      secure_url: req.body.secure_url,
      width: req.body.width,
      height: req.body.height,
    };

    await Transaction.findByIdAndUpdate(transaction._id, {
      paymentProof,
      status: "processing",
    });

    return res.status(200).send();
  } catch ({ message }) {
    return res.status(500).send({ error: message });
  }
};

export default uploadPaymentProofHandler;
