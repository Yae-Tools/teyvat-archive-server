import { object, string, type TypeOf } from "zod";

const params = object({
  id: string({
    required_error: "ID is required",
    invalid_type_error: "ID must be a string"
  })
});

const weaponTypeParams = object({
  type: string({
    required_error: "Type is required",
    invalid_type_error: "Type must be a string"
  }).refine(
    (value) => {
      const validTypes = [
        "WEAPON_SWORD_ONE_HAND",
        "WEAPON_CLAYMORE",
        "WEAPON_POLE",
        "WEAPON_CATALYST",
        "WEAPON_BOW"
      ];
      return validTypes.includes(value);
    },
    {
      message:
        "Type must be one of the following: sword, claymore, polearm, catalyst, bow"
    }
  )
});

const getWeaponByIdSchema = {
  params
};

const getWeaponByTypeSchema = {
  params: weaponTypeParams
};

type GetWeaponByIdInput = TypeOf<typeof params>;
type GetWeaponByTypeInput = TypeOf<typeof weaponTypeParams>;

export {
  getWeaponByIdSchema,
  type GetWeaponByIdInput,
  getWeaponByTypeSchema,
  type GetWeaponByTypeInput
};
