import { Elysia } from "elysia";
import { getGameVersion } from "../controllers/system.controller";
import systemSwagger from "../swagger/system.swagger";

export const systemRoutes = async (app: Elysia) => {
  app.get("/", () => "Welcome to Teyvat Archive API Server", {
    detail: systemSwagger.home
  });

  app.group("/system", (system) => {
    system.get(
      "/health",
      () => {
        return { status: "ok" };
      },
      {
        detail: systemSwagger.health
      }
    );

    system.get(
      "/server/version",
      async () => {
        return { version: "1.0.0" };
      },
      {
        detail: systemSwagger.serverVersion
      }
    );

    system.get(
      "/game/version",
      async () => {
        return getGameVersion();
      },
      {
        detail: systemSwagger.gameVersion
      }
    );

    return system;
  });

  return Promise.resolve(app);
};
