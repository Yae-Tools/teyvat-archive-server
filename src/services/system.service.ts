import { buildMaterialToCharacterMap } from "../utils/maps/characterMaterialMap";

export const systemServices = {
  preBuildCharacterMaterialMap: () => buildMaterialToCharacterMap()
};
