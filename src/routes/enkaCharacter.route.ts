import { Elysia } from "elysia";
import {
  getAllCharacterLocations,
  getAllCharacters,
  getCharacterBySkillDepotId,
} from "../controllers/characters.controller";
import { characterIdValidation } from "../schema/character.schema";

export const characterRoutes = async (app: Elysia) => {
  app.get("/characters/all", async () => {
    return getAllCharacters();
  });

  app.get("/characters/locations", async () => {
    return getAllCharacterLocations();
  });

  app.get(
    "/characters/id/:id",
    async ({ params: { id }, query: { skillDepotId } }) => {
      return getCharacterBySkillDepotId(id, Number(skillDepotId));
    },
    characterIdValidation
  );

  return Promise.resolve(app);
};
