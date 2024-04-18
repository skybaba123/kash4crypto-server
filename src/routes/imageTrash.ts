import deleteImageTrashHandler from "@/controllers/image-trash/deleteImageTrash";
import getAllImageTrashHandler from "@/controllers/image-trash/getAllImageTrash";
import userAuth from "@/middlewares/userAuth";
import { Router } from "express";

const router = Router();

router.get("/image-trashes", userAuth, getAllImageTrashHandler);

router.post("/image-trash/delete", userAuth, deleteImageTrashHandler);

export default router;
