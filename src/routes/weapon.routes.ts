import { Router } from "express";
import { validateRequest } from "zod-express-middleware";

import {
  getAllWeapons,
  getAllWeaponSeries,
  getWeaponById
} from "../controllers/weapons.controller";
import { getWeaponByIdSchema } from "../schema/weapon.schema";

const router = Router();

router.get("/all", getAllWeapons);
router.get("/id/:id", validateRequest(getWeaponByIdSchema), getWeaponById);
router.get("/series", getAllWeaponSeries);

export default router;
