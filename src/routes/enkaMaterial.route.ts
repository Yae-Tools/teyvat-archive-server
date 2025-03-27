import Elysia from "elysia";

import { getMaterialById } from "../controllers/materials.controller";
import { materialIdValidation } from "../schema/material.schema";

export const materialRoutes = async (app: Elysia) => {
  app.get("/materials/id/:id", async (context) => {
    const { id } = context.params;
    return getMaterialById(id), materialIdValidation;
  });

  return Promise.resolve(app);
};
