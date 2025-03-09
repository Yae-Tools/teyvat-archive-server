import Elysia from "elysia";

import { getAllEvents } from "../controllers/events.contrioller";
import { ILanguageCode } from "../types/events.type";

export const eventRoutes = async (app: Elysia) => {
  app.get("/events/all", async ({ query }) => {
    const { language } = query;

    return getAllEvents(language as ILanguageCode);
  });

  return Promise.resolve(app);
};
