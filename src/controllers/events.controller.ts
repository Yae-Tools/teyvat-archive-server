import type { Request, Response } from "express";

import { fetchAmberEvents } from "../services/system.service";
import {
  LANGUAGE_CODES,
  type IEvent,
  type ILanguageCode
} from "../types/events.type";

export const getAllEvents = async (
  req: Request<{}, {}, {}, { language?: ILanguageCode }>,
  res: Response
) => {
  const LANG = req.query.language ?? LANGUAGE_CODES.EN;
  try {
    const eventsResponse = await fetchAmberEvents();
    const eventsParsed: IEvent[] = JSON.parse(eventsResponse!);

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

    res.status(200).send(events);
  } catch (error) {
    console.log("Error fetching events", error);
    res.status(500).send({ error: error });
  }
};
