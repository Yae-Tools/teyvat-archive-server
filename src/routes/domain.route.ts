import Elysia from "elysia";
import { getDailyDomainData } from "../controllers/domains.controller";

export const domainRoutes = async (app: Elysia) => {
  app.group("/domains", (domains) => {
    domains.get(
      "/daily",
      async () => {
        return getDailyDomainData();
      },
      {
        detail: {
          summary: "Get daily domain data",
          description: "Fetches the daily domain data from the API."
        }
      }
    );

    return domains;
  });

  return Promise.resolve(app);
};
