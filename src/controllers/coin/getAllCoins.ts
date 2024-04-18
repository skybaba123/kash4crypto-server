import Coin from "@/models/coin";
import User from "@/models/user";

const getAllCoinsHandler = async (req: any, res: any) => {
  try {
    const requester = await User.findById(req.user._id);
    if (!requester) return res.status(404).send({ error: "No User Found" });

    const coins = await Coin.find({});
    return res.status(200).send(coins.reverse());
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default getAllCoinsHandler;
