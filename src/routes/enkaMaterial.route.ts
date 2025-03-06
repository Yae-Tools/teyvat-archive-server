import Elysia from "elysia";

import { getMaterialById } from "../controllers/materials.controller";

export const materialRoutes = async (app: Elysia) => {
  app.get("/materials/id/:id", async (context) => {
    const { id } = context.params;
    return getMaterialById(id);
  });

  return Promise.resolve(app);
};
