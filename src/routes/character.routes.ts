import { Router } from "express";
import {
  getAllCharacters,
  getCharacterBySkillDepotId
} from "../controllers/characters.controller";

const router = Router();

router.get("/all", getAllCharacters);
router.get("/id/:characterId", getCharacterBySkillDepotId);

export default router;
