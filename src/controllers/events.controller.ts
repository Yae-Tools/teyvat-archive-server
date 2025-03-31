import { fetchAmberEvents } from "../services/system.service";
import { IEvent, ILanguageCode, LANGUAGE_CODES } from "../types/events.type";

export const getAllEvents = async (language?: ILanguageCode) => {
  const LANG = language ?? LANGUAGE_CODES.EN;
  try {
    const eventsResponse = await fetchAmberEvents();
    const eventsParsed: IEvent[] = JSON.parse(eventsResponse);

    const events = Object.values(eventsParsed).map((event: IEvent) => {
      const { id, description, banner, endAt, name, nameFull, startAt } = event;

      return {
        id,
        description: description[LANG],
        imageUrl: banner[LANG],
        start: startAt,
        end: endAt,
        title: name[LANG],
        fullTitle: nameFull[LANG]
      };
    });

    return events;
  } catch (error) {
    console.log("Error fetching events", error);
    return [];
  }
};
