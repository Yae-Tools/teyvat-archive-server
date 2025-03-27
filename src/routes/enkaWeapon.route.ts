import { Elysia, t } from "elysia";

import {
  getAllWeapons,
  getAllWeaponSeries,
  getWeaponById,
} from "../controllers/weapons.controller";
import { weaponIdValidation } from "../schema/weapon.schema";

export const weaponRoutes = async (app: Elysia) => {
  app.group("/weapons", (weapons) => {
    weapons.get(
      "/all",
      async () => {
        return getAllWeapons();
      },
      {
        detail: {
          tags: ["Weapons"],
          summary: "Get all weapons",
          description: "Get all weapons in the game",
        },
      }
    );

    weapons.get(
      "/series",
      async () => {
        return getAllWeaponSeries();
      },
      {
        detail: {
          tags: ["Weapons"],
          summary: "Get all weapon series",
          description: "Get all weapon series in the game",
        },
      }
    );

    weapons.get(
      "/id/:id",
      async ({ params: { id } }) => {
        return getWeaponById(id);
      },
      {
        params: weaponIdValidation.params,
        detail: {
          tags: ["Weapons"],
          summary: "Get weapon by id",
          description: "Get weapon details by its id",
        },
      }
    );
    return weapons;
  });

  return Promise.resolve(app);
};
