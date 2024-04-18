import Coin from "@/models/coin";
import ImageTrash from "@/models/imageTrash";
import User from "@/models/user";

const updateCoinHandler = async (req: any, res: any) => {
  try {
    const coin = await Coin.findById(req.body.coinId);
    if (!coin) return res.status(404).send({ error: "Coin not found" });

    const requester = await User.findById(req.user._id);
    if (!requester) return res.status(404).send({ error: "No User Found" });

    if (requester.role !== "admin")
      return res.status(401).send({ error: "Unauthorized access" });

    if (req.body.icon && coin.icon.secure_url) {
      //store icon in image trash
      const newImageTrash = new ImageTrash({
        label: "Updated from coin",
        location: "coin",
        locationId: coin._id,
        image: coin.icon,
      });
      await newImageTrash.save();
    }

    for (const key in req.body) {
      if (key !== "coinId") {
        (coin as any)[key] = req.body[key];
      }
    }

    const updatedCoin = await coin.save();
    return res.status(200).send(updatedCoin);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default updateCoinHandler;
