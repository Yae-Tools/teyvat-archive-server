import { Router } from "express";

import {
  getAbyssData,
  getAbyssMoonBlessingData
} from "../controllers/abyss.controller";

const router = Router();

router.get("/data", getAbyssData);
router.get("/blessings", getAbyssMoonBlessingData);

export default router;
