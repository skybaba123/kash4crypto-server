import { model, Schema } from "mongoose";

const companySchema = new Schema(
  {
    head: {
      title: { type: String, default: "N/A" },
      description: { type: String, default: "N/A" },
    },

    name: { type: String, trim: true, default: "Crypven" },
    baseUrl: { type: String, trim: true, default: "N/A" },
    phone: { type: String, trim: true, default: "+1 949392844" },
    email: { type: String, trim: true, default: "example@gmail.com" },

    adminMessage: { type: String, trim: true, default: "N/A" },

    referral: {
      minPayout: { type: Number, default: 100 }, //the minimum amount the user has to earn to qualify for the payout
      payoutDuration: {
        type: String,
        enum: ["monthly", "weekly"],
        default: "monthly",
      }, // duration in which you pay users that are qulified for payout
      earningAmount: { type: Number, default: 100 }, // the amount user earn each time thier referral trades
      minTradeAmount: { type: Number, default: 100 }, // the minimum amount about thier referral has to trade before the user receive the earning amount
      status: {
        type: String,
        enum: ["on", "off", "coming-soon"],
        default: "on",
      }, //the referral status
    },

    address: {
      type: String,
      trim: true,
      default: "408 Warren Rd - San Mateo, CA 94402",
    },

    icon: {
      public_id: { type: String },
      secure_url: {
        type: String,
        required: true,
        default: "https://example.com/img.png",
      },
      width: { type: Number },
      height: { type: Number },
    },

    logo: {
      public_id: { type: String },
      secure_url: {
        type: String,
        required: true,
        default: "https://example.com/img.png",
      },
      width: { type: Number },
      height: { type: Number },
    },

    welcomeEmail: {
      status: { type: String, default: "off", enum: ["on", "off"] },
      emailMessage: { type: String, default: "Welcome" },
    },

    currency: {
      name: { type: String, default: "Nigerian Naira" },
      code: { type: String, default: "NGN" },
      symbol: { type: String, default: "₦" },
    },

    emailSetup: {
      host: { type: String, trim: true, default: "N/A" },
      port: { type: Number, default: 0 },
      secure: { type: Boolean, default: true },
      from: { type: String, trim: true, default: "N/A" },
      auth: {
        user: { type: String, default: "N/A" },
        pass: { type: String, default: "N/A" },
      },
    },

    privacyPolicyPage: {
      privacyPolicy: {
        type: String,
        trim: true,
        default: "This is the privacy policy",
      },
    },

    helpPage: {
      commonQuestions: [
        {
          question: { type: String, required: true },
          answer: { type: String, required: true },
        },
      ],
    },

    colors: {
      light: {
        background: { type: String, trim: true, default: "#ffffff" },
        backgroundSec: { type: String, trim: true, default: "#f0f0f0" },
        text: { type: String, trim: true, default: "#333333" },
        textSec: { type: String, trim: true, default: "#666666" },
        primary: { type: String, trim: true, default: "#32bc89" },
      },
      dark: {
        background: { type: String, trim: true, default: "#181818" },
        backgroundSec: { type: String, trim: true, default: "#1f1f1f" },
        text: { type: String, trim: true, default: "#ffffff" },
        textSec: { type: String, trim: true, default: "#cccccc" },
        primary: { type: String, trim: true, default: "#6de8bb" },
      },
      primaryVeryLight: { type: String, trim: true, default: "#e3fff5" },
    },
  },
  { timestamps: true }
);

const Company = model("Company", companySchema);

export default Company;
