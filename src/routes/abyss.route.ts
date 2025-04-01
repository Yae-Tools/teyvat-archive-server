import Elysia from "elysia";
import {
  getAbyssData,
  getAbyssMoonBlessingData
} from "../controllers/abyss.controller";

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
              description: "Abyss data fetched successfully"
            }
          }
        }
      }
    );
    abyss.get(
      "/blessings",
      async () => {
        return getAbyssMoonBlessingData();
      },
      {
        detail: {
          tags: ["Abyss"],
          summary: "Get Abyss Moon Blessing Data",
          description: "Fetches Abyss Moon Blessing data",
          responses: {
            200: {
              description: "Abyss Moon Blessing data fetched successfully"
            }
          }
        }
      }
    );

    return abyss;
  });

  return Promise.resolve(app);
};
