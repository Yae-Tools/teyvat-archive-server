import { Router } from "express";
import { validateRequest } from "zod-express-middleware";

import {
  getAllCharacters,
  getCharacterBySkillDepotId
} from "../controllers/characters.controller";
import { getCharacterByIdSchema } from "../schema/character.schema";

const router = Router();

router.get("/all", getAllCharacters);
router.get(
  "/id/:characterId",
  validateRequest(getCharacterByIdSchema),
  getCharacterBySkillDepotId
);

export default router;
