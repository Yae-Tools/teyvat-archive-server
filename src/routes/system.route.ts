import { Elysia } from "elysia";
import { getGameVersion } from "../controllers/system.controller";

export const systemRoutes = async (app: Elysia) => {
  app.get("/", async () => {
    return { message: "Welcome to Teyvat Archive API" };
  });

  app.get("/system/health", async () => {
    return { status: "ok" };
  });

  app.get("/system/version", async () => {
    return { version: "1.0.0" };
  });

  app.get("/game/version", async () => {
    return getGameVersion();
  });

  return Promise.resolve(app);
};
