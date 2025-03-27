import { fetchAllEventsFromAmber } from "../services/amberClient.service";
import { IEvent, ILanguageCode } from "../types/events.type";
import logger from "../utils/logger";

export const getAllEvents = async (language?: ILanguageCode) => {
  const LANG = language ?? "EN";
  try {
    const eventsResponse = await fetchAllEventsFromAmber();

    const events = Object.values(eventsResponse).map((event: IEvent) => {
      const { id, description, banner, endAt, name, nameFull, startAt } = event;

      return {
        id,
        description: description[LANG],
        imageUrl: banner[LANG],
        start: startAt,
        end: endAt,
        title: name[LANG],
        fullTitle: nameFull[LANG],
      };
    });

    return events;
  } catch (error) {
    logger.error("Error fetching events", error);
    return [];
  }
};
