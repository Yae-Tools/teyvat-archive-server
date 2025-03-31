import Elysia from "elysia";
import { getAllCalendarEvents } from "../controllers/calendar.controller";
import calendarSwagger from "../swagger/calendar.swagger";

export const calendarRoutes = async (app: Elysia) => {
  app.group("/calendar", (calendar) => {
    calendar.get(
      "/all",
      async () => {
        return getAllCalendarEvents();
      },
      {
        detail: calendarSwagger.all
      }
    );

    return calendar;
  });

  return Promise.resolve(app);
};
