import { object, number, type TypeOf } from "zod";

const params = object({
  id: number({
    required_error: "ID is required",
    invalid_type_error: "ID must be a number"
  })
});

const getMaterialByIdSchema = {
  params
};

type GetMaterialByIdInput = TypeOf<typeof params>;

export { getMaterialByIdSchema, type GetMaterialByIdInput };
