import { Schema, model } from "mongoose";

const coinSchema = new Schema(
  {
    label: { type: String, trim: true, required: true },
    value: { type: String, trim: true, required: true },
    walletAddress: { type: String, trim: true, required: true },
    payinRate: { type: Number, required: true },
    minAmount: { type: Number, required: true },
    info: { type: String, trim: true },
    bgColor: { type: String, trim: true, required: true },
    icon: {
      public_id: { type: String, required: true },
      secure_url: { type: String, required: true },
      width: { type: Number, required: true },
      height: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

const Coin = model("Coin", coinSchema);

export default Coin;
