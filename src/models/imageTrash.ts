import { Schema, model, Types } from "mongoose";

const imageTrashSchema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    location: { type: String, required: true },
    locationId: { type: Types.ObjectId, required: true },
    image: {
      public_id: { type: String },
      secure_url: { type: String },
      width: { type: Number },
      height: { type: Number },
    },
  },
  { timestamps: true }
);

const ImageTrash = model("ImageTrash", imageTrashSchema);

export default ImageTrash;
