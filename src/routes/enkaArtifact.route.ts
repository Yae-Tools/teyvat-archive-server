import { Elysia } from "elysia";

import {
  getAllArtifacts,
  getAllArtifactSets,
} from "../controllers/artifacts.controller";

export const artifactRoutes = async (app: Elysia) => {
  app.get("/artifacts/all", async () => {
    return getAllArtifacts();
  });

  app.get("/artifacts/sets", async () => {
    return getAllArtifactSets();
  });

  return Promise.resolve(app);
};
