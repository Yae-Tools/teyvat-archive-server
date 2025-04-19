import { Router } from "express";
import {
  getAllWeapons,
  getAllWeaponSeries,
  getWeaponById
} from "../controllers/weapons.controller";

const router = Router();

router.get("/all", getAllWeapons);
router.get("/id/:id", getWeaponById);
router.get("/series", getAllWeaponSeries);

export default router;
