import { fetchHoyoCalendar } from "../services/system.service";
import logger from "../utils/logger";

export const getAllCalendarEvents = async () => {
  try {
    const calendarResponse = await fetchHoyoCalendar();

    const calendarParsed = JSON.parse(calendarResponse);

    return calendarParsed;
  } catch (error: unknown) {
    logger.error("Error fetching events", error);
    return [];
  }
};
