import ImageTrash from "@/models/imageTrash";
import User from "@/models/user";

const getAllImageTrashHandler = async (req: any, res: any) => {
  try {
    const requester = await User.findById(req.user._id);
    if (!requester) return res.status(404).send({ error: "No User Found" });

    if (requester.role !== "admin")
      return res.status(401).send({ error: "Unauthorized access" });

    const allImageTrash = await ImageTrash.find({});
    return res.status(200).send(allImageTrash.reverse());
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default getAllImageTrashHandler;
