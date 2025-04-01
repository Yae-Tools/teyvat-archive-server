import Elysia from "elysia";

import { getMaterialById } from "../controllers/materials.controller";
import { materialIdValidation } from "../schema/material.schema";
import materialSwagger from "../swagger/material.swagger";

export const materialRoutes = async (app: Elysia) => {
  app.group("/materials", (materials) => {
    materials.get(
      "/id/:id",
      async ({ params: { id } }) => {
        return getMaterialById(id);
      },
      {
        params: materialIdValidation.params,
        detail: materialSwagger.id
      }
    );

    return materials;
  });

  return Promise.resolve(app);
};
