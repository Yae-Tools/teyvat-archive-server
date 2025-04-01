export const LANGUAGE_CODES = {
  EN: "EN",
  RU: "RU",
  CHS: "CHS", // Simplified Chinese
  CHT: "CHT", // Traditional Chinese
  KR: "KR",
  JP: "JP"
} as const;

type ILanguageCode = (typeof LANGUAGE_CODES)[keyof typeof LANGUAGE_CODES];

interface IEvent {
  id: number;
  name: Record<ILanguageCode, string>;
  nameFull: Record<ILanguageCode, string>;
  description: Record<ILanguageCode, string>;
  banner: Record<ILanguageCode, string>; // URLs for banners
  startAt: string; // ISO 8601 date-time string
  endAt: string; // ISO 8601 date-time string
}

type IEventResponse = Record<string, IEvent>;

export { IEvent, IEventResponse, ILanguageCode };
