import { Elysia } from "elysia";

import {
  getAllArtifacts,
  getAllArtifactSets,
  getArtifactSetById
} from "../controllers/artifacts.controller";
import { artifactIdValidation } from "../schema/artifact.schema";
import artifactSwagger from "../swagger/artifact.swagger";

export const artifactRoutes = async (app: Elysia) => {
  app.group("/artifacts", (artifacts) => {
    artifacts.get(
      "/all",
      async () => {
        return getAllArtifacts();
      },
      {
        detail: artifactSwagger.all
      }
    );

    artifacts.get(
      "/sets",
      async () => {
        return getAllArtifactSets();
      },
      {
        detail: artifactSwagger.sets
      }
    );

    artifacts.get(
      "/set/:id",
      async ({ params: { id } }) => {
        return getArtifactSetById(id);
      },
      {
        params: artifactIdValidation.params,
        detail: artifactSwagger.id
      }
    );

    return artifacts;
  });

  return Promise.resolve(app);
};
