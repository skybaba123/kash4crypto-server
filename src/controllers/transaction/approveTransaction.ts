import formatDate from "@/constants/formatDate";
import sendEmail from "@/constants/sendEmail";
import CustomEmail from "@/email/CustomEmail";
import Alert from "@/models/alert";
import Coin from "@/models/coin";
import Company from "@/models/company";
import Transaction from "@/models/transaction";
import User from "@/models/user";
import { render } from "@react-email/render";

const approveTransactionHandler = async (req: any, res: any) => {
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

    const coin = await Coin.findById(transaction.coin.coinId);
    if (!coin) return res.status(404).send({ error: "Coin not found" });

    if (requester.role !== "admin")
      return res.status(401).send({ error: "Unauthorized access" });

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transaction._id,
      {
        actuallyPaid: req.body.actuallyPaid,
        status: "successful",
        payoutProof: req.body.payoutProof,
        coin: {
          label: coin.label,
          value: coin.value,
          rate: coin.payinRate,
          iconUrl: coin.icon.secure_url,
          coinId: coin._id,
        },
      },
      { new: true } //returns the object after the update
    );

    await new Alert({
      message: `Your trade of $${updatedTransaction.actuallyPaid} has been approved`,
      type: "notification",
      ownerId: user._id,
    }).save();

    if (
      updatedTransaction.actuallyPaid >= company.referral.minTradeAmount &&
      user.referralUserId &&
      company.referral.status === "on"
    ) {
      await User.findByIdAndUpdate(user.referralUserId, {
        $inc: { referralBal: company.referral.earningAmount },
        $push: {
          referralTransaction: {
            createdAt: new Date(),
            amount: company.referral.earningAmount,
            type: "earning",
          },
        },
      });
    }

    const mesageData = `We are pleased to inform you that your transaction has been approved successfully. The payment has been sent to your default bank account. |View Transaction: 
    ${company.baseUrl}/user/transactions/${
      updatedTransaction._id
    } |Date: ${formatDate(new Date())}`;

    const emailHtml = render(CustomEmail({ company, message: mesageData }));

    await sendEmail(
      user.email,
      `Transaction Approved`,
      mesageData,
      emailHtml,
      company
    );

    return res.status(200).send();
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default approveTransactionHandler;
