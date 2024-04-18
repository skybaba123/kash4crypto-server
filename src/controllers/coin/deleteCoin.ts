import Coin from "@/models/coin";
import ImageTrash from "@/models/imageTrash";
import User from "@/models/user";

const deleteCoinHandler = async (req: any, res: any) => {
  try {
    const coin = await Coin.findById(req.body.coinId);
    if (!coin) return res.status(404).send({ error: "Coin not found" });

    const requester = await User.findById(req.user._id);
    if (!requester) return res.status(404).send({ error: "No User Found" });

    if (requester.role !== "admin")
      return res.status(401).send({ error: "Unauthorized access" });

    if (coin.icon) {
      //store icon in image trash
      const newImageTrash = new ImageTrash({
        label: "Deleted from coin",
        location: "coin",
        locationId: coin._id,
        image: coin.icon,
      });
      await newImageTrash.save();
    }

    const deletedCoin = await Coin.findByIdAndDelete(coin._id);
    return res.status(200).send(deletedCoin);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default deleteCoinHandler;
