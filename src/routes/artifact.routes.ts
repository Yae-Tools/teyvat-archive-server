import { Router } from "express";

import {
  getAllArtifacts,
  getAllArtifactSets,
  getArtifactSetById
} from "../controllers/artifacts.controller";

const router = Router();

router.get("/all", getAllArtifacts);
router.get("/sets", getAllArtifactSets);
router.get("/set/:id", getArtifactSetById);

export default router;
