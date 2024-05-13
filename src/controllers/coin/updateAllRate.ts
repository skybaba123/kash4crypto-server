import Coin from "@/models/coin";
import User from "@/models/user";

const updateAllRateHandler = async (req: any, res: any) => {
  try {
    const requester = await User.findById(req.user._id);
    if (!requester)
      return res.status(404).send({ error: "No User:Requester Found" });

    if (requester.role !== "admin")
      return res.status(401).send({ error: "Unauthorized access" });

    await Coin.updateMany({}, { payinRate: req.body.payinRate });

    return res.status(200).send();
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default updateAllRateHandler;
