import { Elysia } from "elysia";

import {
  getAllArtifacts,
  getAllArtifactSets,
  getArtifactSetById,
} from "../controllers/artifacts.controller";
import { artifactIdValidation } from "../schema/artifact.schema";

export const artifactRoutes = async (app: Elysia) => {
  app.group("/artifacts", (artifacts) => {
    artifacts.get(
      "/all",
      async () => {
        return getAllArtifacts();
      },
      {
        detail: {
          tags: ["Artifacts"],
          summary: "Get all artifacts",
          description: "Get all artifacts in the game",
        },
      }
    );

    artifacts.get(
      "/sets",
      async () => {
        return getAllArtifactSets();
      },
      {
        detail: {
          tags: ["Artifacts"],
          summary: "Get all artifact sets",
          description: "Get all artifact sets in the game",
        },
      }
    );

    artifacts.get(
      "/set/:id",
      async ({ params: { id } }) => {
        return getArtifactSetById(id);
      },
      {
        params: artifactIdValidation.params,
        detail: {
          tags: ["Artifacts"],
          summary: "Get artifact set by id",
          description: "Get artifact set details by its id",
        },
      }
    );

    return artifacts;
  });

  return Promise.resolve(app);
};
