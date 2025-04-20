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

const getCharacterByIdSchema = {
  params,
  query
};

type GetCharacterByIdInput = {
  params: TypeOf<typeof params>;
  query: TypeOf<typeof query>;
};
export { getCharacterByIdSchema, type GetCharacterByIdInput };
