import { Elysia } from "elysia";
import {
  getAllCharacterLocations,
  getAllCharacters,
  getCharacterBySkillDepotId,
} from "../controllers/characters.controller";
import { characterIdValidation } from "../schema/character.schema";
import characterSwagger from "../swagger/character.swagger";

export const characterRoutes = async (app: Elysia) => {
  app.group("/characters", (characters) => {
    characters.get(
      "/all",
      async () => {
        return getAllCharacters();
      },
      {
        detail: characterSwagger.all,
      }
    );

    characters.get(
      "/locations",
      async () => {
        return getAllCharacterLocations();
      },
      {
        detail: characterSwagger.locations,
      }
    );

    characters.get(
      "/id/:id",
      async ({ params: { id }, query: { skillDepotId } }) => {
        return getCharacterBySkillDepotId(id, Number(skillDepotId));
      },
      {
        params: characterIdValidation.params,
        query: characterIdValidation.query,
        detail: characterSwagger.id,
      }
    );

    return characters;
  });

  return Promise.resolve(app);
};
