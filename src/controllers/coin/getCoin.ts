import Coin from "@/models/coin";

const getCoinHandler = async (req: any, res: any) => {
  try {
    const coin = await Coin.findById(req.body.coinId);
    if (!coin) return res.status(404).send({ error: "Coin not found" });

    return res.status(200).send(coin);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default getCoinHandler;
