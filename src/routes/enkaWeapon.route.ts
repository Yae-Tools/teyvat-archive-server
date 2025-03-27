import { Elysia, t } from "elysia";

import {
  getAllWeapons,
  getAllWeaponSeries,
  getWeaponById,
} from "../controllers/weapons.controller";
import { weaponIdValidation } from "../schema/weapon.schema";
import weaponSwagger from "../swagger/weapon.swagger";

export const weaponRoutes = async (app: Elysia) => {
  app.group("/weapons", (weapons) => {
    weapons.get(
      "/all",
      async () => {
        return getAllWeapons();
      },
      {
        detail: weaponSwagger.all,
      }
    );

    weapons.get(
      "/series",
      async () => {
        return getAllWeaponSeries();
      },
      {
        detail: weaponSwagger.series,
      }
    );

    weapons.get(
      "/id/:id",
      async ({ params: { id } }) => {
        return getWeaponById(id);
      },
      {
        params: weaponIdValidation.params,
        detail: weaponSwagger.id,
      }
    );
    return weapons;
  });

  return Promise.resolve(app);
};
