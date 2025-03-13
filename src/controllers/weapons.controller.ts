import { WeaponData } from "enka-network-api";
import { getAllWeaponsFromEnka } from "../services/enkaClient.service";
import { decryptTextAsset } from "../utils/enkaAssetMapper";

export const getAllWeapons = async () => {
  try {
    const response: WeaponData[] = getAllWeaponsFromEnka();

    const weapons = response.map((weapon) => {
      const { id, name, _nameId, awakenIcon, icon, stars, weaponType, _data } =
        weapon;

      return {
        id: _nameId,
        enkaId: id,
        name: decryptTextAsset(name),
        awakenIcon: awakenIcon.url,
        icon: icon.url,
        stars,
        weaponType,
        data: _data,
      };
    });

    return weapons;
  } catch (error) {
    console.log("Error fetching weapons", error);
    return [];
  }
};
