import { Elysia } from "elysia";

import { getAllWeapons } from "../controllers/weapons.controller";

export const weaponRoutes = async (app: Elysia) => {
  app.get("/weapons/all", async () => {
    return getAllWeapons();
  });

  return Promise.resolve(app);
};
