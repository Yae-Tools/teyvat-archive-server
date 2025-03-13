import { Elysia } from "elysia";

import {
  getAllWeapons,
  getAllWeaponSeries,
  getWeaponById,
} from "../controllers/weapons.controller";

export const weaponRoutes = async (app: Elysia) => {
  app.get("/weapons/all", async () => {
    return getAllWeapons();
  });

  app.get("/weapons/series", async () => {
    return getAllWeaponSeries();
  });

  app.get("/weapons/id/:id", async ({ params: { id } }) => {
    return getWeaponById(id);
  });

  return Promise.resolve(app);
};
