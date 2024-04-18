import { render } from "@react-email/render";
import sendEmail from "@/constants/sendEmail";
import Company from "@/models/company";
import CustomEmail from "@/email/CustomEmail";

const contactUsHandler = async (req: any, res: any) => {
  try {
    const { name, email, message } = req.body;

    const companies = await Company.find({});
    const company = companies[0];
    if (!company) return res.status(404).send({ error: "No company info" });

    const mesageData = `Sender Name: ${name}|Sender Email: ${email}|Message: ${message}`;

    const emailHtml = render(CustomEmail({ company, message: mesageData }));

    const emailResponse = await sendEmail(
      company.email,
      `Inquiry from ${name}`,
      mesageData,
      emailHtml,
      company
    );

    if (emailResponse.status !== "sent")
      return res.status(400).send({ error: emailResponse.statusMessage });

    return res.status(200).send();
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default contactUsHandler;
