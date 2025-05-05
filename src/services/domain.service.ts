import type {
  ICustomBaseCharacter,
  ICustomBaseWeapon
} from "../types/enka.type";
import { buildMaterialToCharacterMap } from "../utils/maps/characterMaterialMap";
import { buildMaterialToWeaponMap } from "../utils/maps/weaponMaterialMap";

export function getCharactersForMaterial(materialId: number) {
  return getCharactersForMaterialOptimized(materialId);
}

export function getWeaponsForMaterial(materialId: number) {
  return getWeaponsForMaterialOptimized(materialId);
}

let materialToCharacterMap: Map<number, ICustomBaseCharacter[]> | null = null;
let materialToWeaponMap: Map<number, ICustomBaseWeapon[]> | null = null;

export function getCharactersForMaterialOptimized(
  materialId: number
): ICustomBaseCharacter[] {
  materialToCharacterMap ??= buildMaterialToCharacterMap();

  return materialToCharacterMap.get(materialId) || [];
}

export function getWeaponsForMaterialOptimized(
  materialId: number
): ICustomBaseWeapon[] {
  materialToWeaponMap ??= buildMaterialToWeaponMap();

  return materialToWeaponMap.get(materialId) || [];
}
