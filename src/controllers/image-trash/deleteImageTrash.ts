import ImageTrash from "@/models/imageTrash";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const deleteImageTrashHandler = async (req: any, res: any) => {
  try {
    const imageTrash = await ImageTrash.findById(req.body.imageTrashId);
    if (!imageTrash)
      return res.status(404).send({ error: "Image trash not found" });

    const delCloudinaryRes = await cloudinary.v2.api.delete_resources(
      [imageTrash.image.public_id],
      {
        type: "upload",
        resource_type: "image",
      }
    );

    console.log(delCloudinaryRes);

    const deletedImageTrash = await ImageTrash.findByIdAndDelete(
      imageTrash._id
    );
    return res.status(200).send(deletedImageTrash);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default deleteImageTrashHandler;
