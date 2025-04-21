import { object, string, type TypeOf } from "zod";

const params = object({
  id: string({
    required_error: "ID is required",
    invalid_type_error: "ID must be a string"
  })
});

const getWeaponByIdSchema = {
  params
};

type GetWeaponByIdInput = TypeOf<typeof params>;

export { getWeaponByIdSchema, type GetWeaponByIdInput };
