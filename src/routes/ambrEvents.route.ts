import Elysia from "elysia";

import { getAllEvents } from "../controllers/events.controller";
import { ILanguageCode } from "../types/events.type";
import eventSwagger from "../swagger/event.swagger";

export const eventRoutes = async (app: Elysia) => {
  app.group("/events", (events) => {
    events.get(
      "/all",
      async ({ query }) => {
        const { language } = query;

        return getAllEvents(language as ILanguageCode);
      },
      {
        detail: eventSwagger.all,
      }
    );

    return events;
  });

  return Promise.resolve(app);
};
