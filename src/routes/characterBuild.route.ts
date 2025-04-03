import { Elysia } from "elysia";
import { createCharacterBuildHandler } from "../controllers/characterBuild.controller";
import { createCharacterBuildValidation } from "../schema/characterBuild.schema";

export const characterBuildRoutes = async (app: Elysia) => {
  app.group("/builds", (builds) => {
    builds.post(
      "/create",
      async ({ body }) => {
        const build = await createCharacterBuildHandler(body);
        return build;
      },
      {
        body: createCharacterBuildValidation.body
      }
    );
    return builds;
  });
};
