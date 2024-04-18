import { model, Schema, Types } from "mongoose";

const userSchema = new Schema(
  {
    fullName: { type: String, trim: true, required: true },

    username: { type: String, trim: true, lowercase: true, required: true },

    phoneNumber: { type: String, trim: true, required: true },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },

    hashedPassword: {
      type: String,
      required: true,
    },

    referralUserId: Types.ObjectId,

    referralBal: { type: Number, default: 0 },

    referralTransaction: {
      type: [
        {
          amount: { type: Number, required: true },
          type: {
            type: String,
            required: true,
            enum: ["withdrawal", "earning"],
          },
          createdAt: { type: Date, default: new Date() },
        },
      ],
      default: [],
    },

    role: { type: String, enum: ["user", "admin"], default: "user" },

    manager: { type: String, enum: ["yes", "no"], default: "no" },

    verificationCode: String,
    verificationCodeExpiry: Number,
    sessionToken: String,
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;

export const createUser = async (data: {
  username: string;
  email: string;
  hashedPassword: string;
}) => new User(data).save();
