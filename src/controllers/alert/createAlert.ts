import Alert from "@/models/alert";
import User from "@/models/user";

const createAlertHandler = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send({ error: "No user found" });

    const newAlert = new Alert({
      message: req.body.message,
      type: req.body.type,
      ownerId: user._id,
    });

    const savedAlert = await newAlert.save();
    return res.status(200).send(savedAlert);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default createAlertHandler;
