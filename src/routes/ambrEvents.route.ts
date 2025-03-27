import Elysia from "elysia";

import { getAllEvents } from "../controllers/events.controller";
import { ILanguageCode } from "../types/events.type";

export const eventRoutes = async (app: Elysia) => {
  // app.get("/events/all", async ({ query }) => {
  //   const { language } = query;

  //   return getAllEvents(language as ILanguageCode);
  // });

  app.group("/events", (events) => {
    events.get(
      "/all",
      async ({ query }) => {
        const { language } = query;

        return getAllEvents(language as ILanguageCode);
      },
      {
        detail: {
          tags: ["Events"],
          summary: "Get all events",
          description: "Get all events in the game",
        },
      }
    );

    return events;
  });

  return Promise.resolve(app);
};
