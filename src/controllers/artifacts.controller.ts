import type { Request, Response } from "express";

import decryptTextAsset from "../helpers/decryptTextAssets";
import { getArtifactSetByIdFromEnka } from "../services/enkaClient.service";
import { getArtifactCollection } from "../utils/enkaAssetMapper";
import {
  fetchAllArtifacts,
  fetchAllArtifactSets
} from "../helpers/fetchArtifacts";
import type { GetArtifactSetByIdInput } from "../schema/artifact.schema";

export const getAllArtifacts = async (_req: Request, res: Response) => {
  try {
    const artifacts = await fetchAllArtifacts();

    res.status(200).send(artifacts);
  } catch (error) {
    console.log("Error fetching artifacts", error);
    res.status(500).send({ error: error });
  }
};

export const getAllArtifactSets = async (_req: Request, res: Response) => {
  try {
    const artifactSets = await fetchAllArtifactSets();

    res.status(200).send(artifactSets);
  } catch (error) {
    console.log("Error fetching artifact sets", error);
    res.status(500).send({ error: error });
  }
};

export const getArtifactSetById = async (
  req: Request<GetArtifactSetByIdInput["params"]>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const [artifactSet, artifactSets, artifacts] = await Promise.all([
      getArtifactSetByIdFromEnka(id),
      fetchAllArtifactSets(),
      fetchAllArtifacts()
    ]);

    const { name, icon, setBonus } = artifactSet;

    const artifactCollection = getArtifactCollection(artifacts, id);

    const set = {
      id,
      name: decryptTextAsset(name),
      icon: icon.url,
      rarities: artifactSets.find((set) => set.id.toString() === id)?.rarities,
      highestRarity: artifactSets.find((set) => set.id.toString() === id)
        ?.highestRarity,
      setBonus: setBonus.map((bonus) => ({
        id: bonus.id,
        needCount: bonus.needCount,
        description: decryptTextAsset(bonus.description),
        addProps: bonus.addProps.map((prop) => ({
          fightProp: prop.fightProp,
          fightPropName: decryptTextAsset(prop.fightPropName),
          value: prop.value,
          isPercent: prop.isPercent,
          rawValue: prop.rawValue,
          multiplier: prop.getMultipliedValue()
        }))
      })),
      collection: artifactCollection
    };

    res.status(200).send(set);
  } catch (error: unknown) {
    res.status(500).send({ error: error });
  }
};
