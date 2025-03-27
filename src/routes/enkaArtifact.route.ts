import { Elysia } from "elysia";

import {
  getAllArtifacts,
  getAllArtifactSets,
  getArtifactSetById,
} from "../controllers/artifacts.controller";
import { artifactIdValidation } from "../schema/artifact.schema";

export const artifactRoutes = async (app: Elysia) => {
  app.get("/artifacts/all", async () => {
    return getAllArtifacts();
  });

  app.get("/artifacts/sets", async () => {
    return getAllArtifactSets();
  });

  app.get("/artifacts/set/:id", async ({ params: { id } }) => {
    return getArtifactSetById(id), artifactIdValidation;
  });

  return Promise.resolve(app);
};
