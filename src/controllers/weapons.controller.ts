import { WeaponData } from "enka-network-api";
import type { Request, Response } from "express";

import {
  getAllWeaponsFromEnka,
  getWeaponByIdFromEnka
} from "../services/enkaClient.service";
import { mapRefinemetData, mapWeaponStats } from "../utils/enkaAssetMapper";
import decryptTextAsset from "../helpers/decryptTextAssets";

export const getAllWeapons = async (_req: Request, res: Response) => {
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
        data: _data
      };
    });

    res.status(200).send(weapons);
  } catch (error) {
    console.log("Error fetching weapons", error);
    res.status(500).send({ error: error });
  }
};

export const getWeaponById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;
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
      splashImage
    } = response;

    const weapon = {
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
      stats
    };

    if (weapon) {
      res.status(200).send(weapon);
    } else {
      res.status(404).send({ error: "Weapon not found" });
    }
  } catch (error: unknown) {
    res.status(500).send({ error: error });
  }
};

export const getAllWeaponSeries = async (_req: Request, res: Response) => {
  try {
    const response: WeaponData[] = getAllWeaponsFromEnka();

    //filter them to groups by _nameId
    // eg: if _nameId is "Sword_Blunt", group it as Blunt series. find other weapons with same 2nd part of _nameId

    const weaponSeries = response.reduce(
      (
        acc: {
          [key: string]: {
            id: string;
            enkaId: string;
            name: string;
          }[];
        },
        weapon
      ) => {
        const { id, name, _nameId } = weapon;

        const series = _nameId.split("_")[1];

        if (!acc[series]) {
          acc[series] = [];
        }

        acc[series].push({
          id: _nameId,
          enkaId: id.toString(),
          name: decryptTextAsset(name)
        });

        return acc;
      },
      {}
    );

    res.status(200).send(weaponSeries);
  } catch (error) {
    console.log("Error fetching weapon series", error);
    res.status(500).send({ error: error });
  }
};
