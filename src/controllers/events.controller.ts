import type { Request, Response } from "express";

import { fetchAmberEvents } from "../services/datafetch.service";
import { LANGUAGE_CODES, type IEvent } from "../types/events.type";
import type { GetEventsInput } from "../schema/event.schema";

export const getAllEvents = async (
  req: Request<object, object, object, GetEventsInput>,
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
