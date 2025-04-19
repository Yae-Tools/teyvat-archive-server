import { Router } from "express";
import { getAllRedeemCodes } from "../controllers/codes.controller";

const router = Router();

router.get("/all", getAllRedeemCodes);

export default router;
