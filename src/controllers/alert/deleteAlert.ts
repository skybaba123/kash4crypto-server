import Alert from "@/models/alert";
import User from "@/models/user";

const deleteAlertHandler = async (req: any, res: any) => {
  try {
    const alert = await Alert.findById(req.body.alertId);
    if (!alert) return res.status(404).send({ error: "Alert not found" });

    const requester = await User.findById(req.user._id);
    if (!requester) return res.status(404).send({ error: "No User Found" });

    if (requester.role !== "admin")
      return res.status(401).send({ error: "Unauthorized access" });

    const deletedAlert = await Alert.findByIdAndDelete(alert._id);
    return res.status(200).send(deletedAlert);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default deleteAlertHandler;
