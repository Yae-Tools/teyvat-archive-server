import { Elysia } from "elysia";
import {
  getAllCharacterLocations,
  getAllCharacters,
  getCharacterBySkillDepotId,
} from "../controllers/characters.controller";
import { characterIdValidation } from "../schema/character.schema";

export const characterRoutes = async (app: Elysia) => {
  // app.get("/characters/all", async () => {
  //   return getAllCharacters();
  // });

  // app.get("/characters/locations", async () => {
  //   return getAllCharacterLocations();
  // });

  // app.get(
  //   "/characters/id/:id",
  //   async ({ params: { id }, query: { skillDepotId } }) => {
  //     return getCharacterBySkillDepotId(id, Number(skillDepotId));
  //   },
  //   characterIdValidation
  // );

  app.group("/characters", (characters) => {
    characters.get(
      "/all",
      async () => {
        return getAllCharacters();
      },
      {
        detail: {
          tags: ["Characters"],
          summary: "Get all characters",
          description: "Get all characters in the game",
        },
      }
    );

    characters.get(
      "/locations",
      async () => {
        return getAllCharacterLocations();
      },
      {
        detail: {
          tags: ["Characters"],
          summary: "Get all character locations",
          description: "Get all character locations in the game",
        },
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
        detail: {
          tags: ["Characters"],
          summary: "Get character by id",
          description: "Get character details by its id",
        },
      }
    );

    return characters;
  });

  return Promise.resolve(app);
};
