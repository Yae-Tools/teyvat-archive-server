import { IEventResponse } from "../types/events.type";

const AMBR_BASE_URL = process.env.PROJECT_AMBR_BASE_URL;

export async function fetchAllEventsFromAmber() {
  const response = await fetch(`${AMBR_BASE_URL}/assets/data/event.json`);
  return response.json() as Promise<IEventResponse>;
}
