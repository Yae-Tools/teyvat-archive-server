import { Router } from "express";
import { validateRequest } from "zod-express-middleware";

import {
  getAllWeapons,
  getAllWeaponSeries,
  getWeaponById,
  getAllWeaponsByType
} from "../controllers/weapons.controller";
import {
  getWeaponByIdSchema,
  getWeaponByTypeSchema
} from "../schema/weapon.schema";

const router = Router();

router.get("/all", getAllWeapons);
router.get(
  "/all/:type",
  validateRequest(getWeaponByTypeSchema),
  getAllWeaponsByType
);
router.get("/id/:id", validateRequest(getWeaponByIdSchema), getWeaponById);
router.get("/series", getAllWeaponSeries);

export default router;
