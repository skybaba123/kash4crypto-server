import { Schema, Types, model } from "mongoose";

const alertSchema = new Schema(
  {
    message: { type: String, trim: true, required: true },
    type: {
      type: String,
      trim: true,
      required: true,
      enum: ["activity", "notification"],
    },
    ownerId: { type: Types.ObjectId, required: true },
  },
  { timestamps: true }
);

const Alert = model("Alert", alertSchema);

export default Alert;
