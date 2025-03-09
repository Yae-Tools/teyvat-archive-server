// Define supported language codes as a union type
type ILanguageCode = "EN" | "RU" | "CHS" | "CHT" | "KR" | "JP";
// Generic type for fields that map languages to strings
type ILanguageMap<T = string> = Record<ILanguageCode, T>;

interface IEvent {
  id: number;
  name: ILanguageMap<string>;
  nameFull: ILanguageMap<string>;
  description: ILanguageMap<string>; // Descriptions contain HTML-like strings
  banner: ILanguageMap<string>; // URLs for banners
  startAt: string; // ISO 8601 date-time string
  endAt: string; // ISO 8601 date-time string
}

type IEventResponse = Record<string, IEvent>;

export { IEvent, IEventResponse, ILanguageCode, ILanguageMap };
