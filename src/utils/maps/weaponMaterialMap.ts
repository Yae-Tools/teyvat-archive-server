import decryptTextAsset from "../../helpers/decryptTextAssets";
import { getAllWeaponsFromEnka } from "../../services/enkaClient.service";
import type { ICustomBaseWeapon } from "../../types/enka.type";
import { starsToRarity } from "../abyssDataParser";

export function buildMaterialToWeaponMap() {
  const weapons = getAllWeaponsFromEnka();
  const materialToWeaponMap = new Map<number, ICustomBaseWeapon[]>();

  weapons.forEach((weapon) => {
    const upgradeCost = weapon.getAscensionData(3);

    if (!upgradeCost) return;

    const customWeapon: ICustomBaseWeapon = {
      id: weapon.id,
      nameId: weapon._nameId,
      name: decryptTextAsset(weapon.name),
      iconUrl: weapon.icon.url,
      rarity: starsToRarity(weapon.stars)
    };

    upgradeCost.cost.items.forEach((item) => {
      const materialId = item.material.id;
      if (!materialToWeaponMap.has(materialId)) {
        materialToWeaponMap.set(materialId, []);
      }
      materialToWeaponMap.get(materialId)!.push(customWeapon);
    });
  });

  return materialToWeaponMap;
}
