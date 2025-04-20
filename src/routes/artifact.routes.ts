import { Router } from "express";
import { validateRequest } from "zod-express-middleware";

import {
  getAllArtifacts,
  getAllArtifactSets,
  getArtifactSetById
} from "../controllers/artifacts.controller";
import { getArtifactSetByIdSchema } from "../schema/artifact.schema";

const router = Router();

router.get("/all", getAllArtifacts);
router.get("/sets", getAllArtifactSets);
router.get(
  "/set/:id",
  validateRequest(getArtifactSetByIdSchema),
  getArtifactSetById
);

export default router;
