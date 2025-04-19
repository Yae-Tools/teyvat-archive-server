import { Router } from "express";
import { getGameVersion, refetchCache } from "../controllers/system.controller";

const router = Router();

//add route prefix

router.get("/game/version", getGameVersion);
router.get("/cache/refresh", refetchCache);

export default router;
