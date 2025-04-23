import { Router } from "express";
import { validateRequest } from "zod-express-middleware";
import {
  createNewCharacterBuild,
  getAllCharacterBuilds,
  getCharacterBuildById
} from "../controllers/characterBuilds.controller";
import {
  createNewCharacterBuildSchema,
  getCharacterBuildByIdSchema
} from "../schema/characterbuild.schema";

const router = Router();

router.get("/all", getAllCharacterBuilds);
router.get(
  "/id/:buildId",
  validateRequest(getCharacterBuildByIdSchema),
  getCharacterBuildById
);
router.post(
  "/create",
  validateRequest(createNewCharacterBuildSchema),
  createNewCharacterBuild
);

export default router;
