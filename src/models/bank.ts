import { Schema, Types, model } from "mongoose";

const bankSchema = new Schema(
  {
    accountName: { type: String, trim: true, required: true },
    accountNumber: { type: String, trim: true, required: true },
    bankName: { type: String, trim: true, required: true },
    accountType: {
      type: String,
      trim: true,
      required: true,
      enum: ["savings", "current"],
    },
    additionalDetail: { type: String, trim: true, required: true },
    defaultAccount: {
      type: String,
      trim: true,
      required: true,
      enum: ["yes", "no"],
    },
    ownerId: { type: Types.ObjectId, required: true },
  },
  { timestamps: true }
);

const Bank = model("Bank", bankSchema);

export default Bank;
