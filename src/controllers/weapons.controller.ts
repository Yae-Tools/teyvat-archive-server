import { WeaponData } from "enka-network-api";
import {
  getAllWeaponsFromEnka,
  getWeaponByIdFromEnka,
} from "../services/enkaClient.service";
import {
  decryptTextAsset,
  mapRefinemetData,
  mapWeaponStats,
} from "../utils/enkaAssetMapper";

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
        series: _nameId.split("_")[1],
        data: _data,
      };
    });

    return weapons;
  } catch (error) {
    console.log("Error fetching weapons", error);
    return [];
  }
};

export const getWeaponById = async (id: string) => {
  try {
    const response: WeaponData = getWeaponByIdFromEnka(id);

    const refinements = mapRefinemetData(response.refinements);
    const stats = mapWeaponStats(response);

    const {
      name,
      _nameId,
      awakenIcon,
      icon,
      stars,
      weaponType,
      description,
      splashImage,
    } = response;

    return {
      id: _nameId,
      enkaId: id,
      name: decryptTextAsset(name),
      awakenIcon: awakenIcon.url,
      description: decryptTextAsset(description),
      icon: icon.url,
      splashImage: splashImage.url,
      stars,
      series: _nameId.split("_")[1],
      weaponType,
      refinements,
      stats,
    };
  } catch (error) {
    console.log("Error fetching weapon by id", error);
    return {};
  }
};

export const getAllWeaponSeries = async () => {
  try {
    const response: WeaponData[] = getAllWeaponsFromEnka();

    //filter them to groups by _nameId
    // eg: if _nameId is "Sword_Blunt", group it as Blunt series. find other weapons with same 2nd part of _nameId

    const weaponSeries = response.reduce(
      (acc: { [key: string]: any[] }, weapon) => {
        const { id, name, _nameId } = weapon;

        const series = _nameId.split("_")[1];

        if (!acc[series]) {
          acc[series] = [];
        }

        acc[series].push({
          id: _nameId,
          enkaId: id,
          name: decryptTextAsset(name),
        });

        return acc;
      },
      {},
    );

    return weaponSeries;
  } catch (error) {
    console.log("Error fetching weapon series", error);
    return [];
  }
};
