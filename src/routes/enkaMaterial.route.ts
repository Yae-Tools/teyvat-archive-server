import Elysia from "elysia";

import { getMaterialById } from "../controllers/materials.controller";
import { materialIdValidation } from "../schema/material.schema";

export const materialRoutes = async (app: Elysia) => {
  app.group("/materials", (materials) => {
    materials.get(
      "/id/:id",
      async ({ params: { id } }) => {
        return getMaterialById(id);
      },
      {
        params: materialIdValidation.params,
        detail: {
          tags: ["Materials"],
          summary: "Get material by id",
          description: "Get material details by its id",
        },
      }
    );

    return materials;
  });

  return Promise.resolve(app);
};
