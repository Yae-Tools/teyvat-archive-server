import { Elysia } from "elysia";

import {
  getAllWeapons,
  getAllWeaponSeries,
} from "../controllers/weapons.controller";

export const weaponRoutes = async (app: Elysia) => {
  app.get("/weapons/all", async () => {
    return getAllWeapons();
  });

  app.get("/weapons/series", async () => {
    return getAllWeaponSeries();
  });

  return Promise.resolve(app);
};
