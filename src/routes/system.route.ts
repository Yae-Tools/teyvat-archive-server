import { Elysia } from "elysia";
import { getGameVersion } from "../controllers/system.controller";

export const systemRoutes = async (app: Elysia) => {
  app.get("/", () => "Welcome to Teyvat Archive API", {
    detail: {
      tags: ["System"],
      summary: "Welcome message",
      description: "Welcome message for the API",
    },
  });

  app.group("/system", (system) => {
    system.get(
      "/health",
      () => {
        return { status: "ok" };
      },
      {
        detail: {
          tags: ["System"],
          summary: "Health check",
          description: "Check if the server is running",
        },
      }
    );

    system.get(
      "/server/version",
      async () => {
        return { version: "1.0.0" };
      },
      {
        detail: {
          tags: ["System"],
          summary: "Get server version",
          description: "Get the current version of the server",
        },
      }
    );

    system.get(
      "/game/version",
      async () => {
        return getGameVersion();
      },
      {
        detail: {
          tags: ["System"],
          summary: "Get game version",
          description: "Get the current version of the game",
        },
      }
    );

    return system;
  });

  return Promise.resolve(app);
};
