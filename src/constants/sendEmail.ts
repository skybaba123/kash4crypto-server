import nodemailer from "nodemailer";
// import nextLogger from "./logger";

const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html: string,
  company: any
) => {
  try {
    let transporter = nodemailer.createTransport({
      host: company.emailSetup.host,
      port: company.emailSetup.port,
      secure: company.emailSetup.secure,
      auth: {
        user: company.emailSetup.auth.user,
        pass: company.emailSetup.auth.pass,
      },
    });

    let info = await transporter.sendMail({
      from: company.emailSetup.from, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    // nextLogger.info(`Message sent: %s", ${info.messageId}`);

    const response = {
      status: "sent",
      statusMessage: `"Message sent: %s", ${info.messageId})`,
    };

    console.log(response);
    return response;
  } catch ({ message }: any) {
    // nextLogger.error(message);
    const response = {
      status: "not-sent",
      statusMessage: `Something went wrong: ${message}`,
    };

    console.log(response);
    return response;
  }
};

export default sendEmail;
