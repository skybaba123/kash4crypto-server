import createCoinHandler from "@/controllers/coin/createCoin";
import deleteCoinHandler from "@/controllers/coin/deleteCoin";
import getAllCoinsHandler from "@/controllers/coin/getAllCoins";
import getCoinHandler from "@/controllers/coin/getCoin";
import updateCoinHandler from "@/controllers/coin/updateCoin";
import userAuth from "@/middlewares/userAuth";
import { Router } from "express";

const router = Router();

router.post("/coin/create", userAuth, createCoinHandler);

router.get("/coins", userAuth, getAllCoinsHandler);

router.post("/coin", userAuth, getCoinHandler);

router.post("/coin/update", userAuth, updateCoinHandler);

router.post("/coin/delete", userAuth, deleteCoinHandler);

export default router;
