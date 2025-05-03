import type { ICustomBaseCharacter } from "../types/enka.type";
import { buildMaterialToCharacterMap } from "../utils/maps/characterMaterialMap";

export function getCharactersForMaterial(materialId: number) {
  return getCharactersForMaterialOptimized(materialId);
}

export function getWeaponsForMaterial(materialId: number) {}

let materialToCharacterMap: Map<number, ICustomBaseCharacter[]> | null = null;

export function getCharactersForMaterialOptimized(
  materialId: number
): ICustomBaseCharacter[] {
  if (!materialToCharacterMap) {
    materialToCharacterMap = buildMaterialToCharacterMap();
  }

  return materialToCharacterMap.get(materialId) || [];
}
