import { Router } from "express";
import {
  getGameVersion,
  refetchCache,
  runMigrations,
  resetMigrations
} from "../controllers/system.controller";
import { requireUser } from "../middleware/requireUser";
import { hasPermission } from "../middleware/hasPermission";
import { EUserRole } from "../types/database.types";

const router = Router();

router.get("/game/version", getGameVersion);
router.get(
  "/cache/refresh",
  [requireUser, hasPermission(EUserRole.ADMIN)],
  refetchCache
);
router.get(
  "/migrate",
  [requireUser, hasPermission(EUserRole.ADMIN)],
  runMigrations
);
router.get(
  "/migrate/reset",
  [requireUser, hasPermission(EUserRole.ADMIN)],
  resetMigrations
);

export default router;
