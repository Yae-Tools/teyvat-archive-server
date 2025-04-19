import { Router } from "express";
import {
  getGameVersion,
  refetchCache,
  runMigrations
} from "../controllers/system.controller";

const router = Router();

//add route prefix

router.get("/game/version", getGameVersion);
router.get("/cache/refresh", refetchCache);
router.get("/migrate", runMigrations);

export default router;
