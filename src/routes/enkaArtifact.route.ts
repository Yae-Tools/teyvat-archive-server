import { Elysia } from "elysia";

import { getAllArtifacts } from "../controllers/artifacts.controller";

export const artifactRoutes = async (app: Elysia) => {
  app.get("/artifacts/all", async () => {
    return getAllArtifacts();
  });

  return Promise.resolve(app);
};
