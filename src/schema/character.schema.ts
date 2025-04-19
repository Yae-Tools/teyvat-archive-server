import { number, object, type TypeOf } from "zod";

const params = object({
  characterId: number({
    required_error: "Character ID is required",
    invalid_type_error: "Character ID must be a number"
  })
});

const query = object({
  skillDepotId: number({
    required_error: "Skill Depot ID is required",
    invalid_type_error: "Skill Depot ID must be a number"
  })
});

const getCharacterByIdSchema = object({ params, query });

type GetCharacterByIdInput = TypeOf<typeof getCharacterByIdSchema>;

export { getCharacterByIdSchema, type GetCharacterByIdInput };
