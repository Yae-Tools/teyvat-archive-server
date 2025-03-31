import Elysia from "elysia";
import { getAbyssData } from "../controllers/abyss.controller";

export const abyssRoutes = async (app: Elysia) => {
  app.group("/abyss", (abyss) => {
    abyss.get(
      "/data",
      async () => {
        return getAbyssData();
      },
      {
        detail: {
          tags: ["Abyss"],
          summary: "Get Abyss Data",
          description: "Fetches Abyss data",
          responses: {
            200: {
              description: "Abyss data fetched successfully",
            },
          },
        },
      }
    );

    return abyss;
  });

  return Promise.resolve(app);
};
