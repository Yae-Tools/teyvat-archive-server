import { object, string, type TypeOf } from "zod";
import type { ILanguageCode } from "../types/events.type";
import { LANGUAGE_CODES } from "../types/events.type";

const query = object({
  language: string({
    invalid_type_error: "Language must be a string"
  })
    .optional()
    .refine(
      (val) => {
        return (
          !val || Object.values(LANGUAGE_CODES).includes(val as ILanguageCode)
        );
      },
      {
        message: "Invalid language code"
      }
    )
    .transform((val) => val as ILanguageCode | undefined)
});

const getEventsSchema = object({ query });

type GetEventsInput = TypeOf<typeof getEventsSchema>;

export { getEventsSchema, type GetEventsInput };
