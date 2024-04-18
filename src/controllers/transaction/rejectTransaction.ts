import formatDate from "@/constants/formatDate";
import sendEmail from "@/constants/sendEmail";
import CustomEmail from "@/email/CustomEmail";
import Alert from "@/models/alert";
import Company from "@/models/company";
import Transaction from "@/models/transaction";
import User from "@/models/user";
import { render } from "@react-email/render";

const rejectTransactionHandler = async (req: any, res: any) => {
  try {
    const companies = await Company.find({});
    if (companies.length <= 0)
      return res.status(404).send({ error: "No company data found" });
    const company = companies[0];

    const transaction = await Transaction.findById(req.body.transactionId);
    if (!transaction)
      return res.status(404).send({ error: "Transaction not found" });

    const requester = await User.findById(req.user._id);
    if (!requester)
      return res.status(404).send({ error: "No User:Requester Found" });

    const user = await User.findById(transaction.ownerId);
    if (!user) return res.status(404).send({ error: "No User Found" });

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transaction._id,
      {
        failedReason: req.body.failedReason,
        status: "failed",
      },
      { new: true }
    );

    await new Alert({
      message: `Your trade of $${transaction.priceAmount} failed`,
      type: "notification",
      ownerId: user._id,
    }).save();

    const mesageData = `We regret to inform you that your recent transaction has encountered an issue and could not be completed successfully. The payment for this transaction was not processed. |Please review the details of the transaction and ensure that all information is accurate. If you believe there was an error or need further assistance, don't hesitate to reach out to our support team. |View Transaction:
    ${company.baseUrl}/user/transactions/${
      updatedTransaction._id
    } |Date: ${formatDate(new Date())}`;

    const emailHtml = render(CustomEmail({ company, message: mesageData }));

    await sendEmail(
      user.email,
      `Transaction Failed`,
      mesageData,
      emailHtml,
      company
    );

    return res.status(200).send();
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default rejectTransactionHandler;
