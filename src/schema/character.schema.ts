import { object, string, type TypeOf } from "zod";

const params = object({
  characterId: string({
    required_error: "Character ID is required",
    invalid_type_error: "Character ID must be a string"
  })
});

const query = object({
  skillDepotId: string({
    required_error: "Skill Depot ID is required",
    invalid_type_error: "Skill Depot ID must be a string"
  })
});

const getCharacterByIdSchema = {
  params,
  query
};

type GetCharacterByIdInput = {
  params: TypeOf<typeof params>;
  query: TypeOf<typeof query>;
};
export { getCharacterByIdSchema, type GetCharacterByIdInput };
