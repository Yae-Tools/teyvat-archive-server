import { WeaponData } from "enka-network-api";
import { getAllWeaponsFromEnka } from "../services/enkaClient.service";
import { decryptTextAsset } from "../utils/enkaAssetMapper";

export const getAllWeapons = async () => {
  try {
    const response: WeaponData[] = getAllWeaponsFromEnka();

    const weapons = response.map((weapon) => {
      const {
        id,
        name,
        _nameId,
        description,
        awakenIcon,
        icon,
        stars,
        weaponType,
      } = weapon;

      return {
        id: _nameId,
        enkaId: id,
        name: decryptTextAsset(name),
        description: decryptTextAsset(description),
        awakenIcon: awakenIcon.url,
        icon: icon.url,
        stars,
        weaponType,
      };
    });

    return weapons;
  } catch (error) {
    console.log("Error fetching weapons", error);
    return [];
  }
};
