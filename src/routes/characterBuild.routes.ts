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
import { requireUser } from "../middleware/requireUser";
import { hasPermission } from "../middleware/hasPermission";
import { EUserRole } from "../types/database.types";

const router = Router();

router.get("/all", getAllCharacterBuilds);
router.get(
  "/id/:buildId",
  [validateRequest(getCharacterBuildByIdSchema)],
  getCharacterBuildById
);
router.post(
  "/create",
  [
    requireUser,
    hasPermission(EUserRole.REGULAR),
    validateRequest(createNewCharacterBuildSchema)
  ],
  createNewCharacterBuild
);

export default router;
