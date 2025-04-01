import {
  getAllArtifactSetsFromEnka,
  getAllArtifactsFromEnka,
  getArtifactSetByIdFromEnka
} from "../services/enkaClient.service";
import {
  decryptTextAsset,
  getArtifactCollection
} from "../utils/enkaAssetMapper";
import { artifactNotFoundError } from "../utils/errorMessageInterceptor";

export const getAllArtifacts = async () => {
  try {
    const response = getAllArtifactsFromEnka();

    const artifacts = response.map((artifact) => {
      const {
        id,
        name,
        equipType,
        equipTypeName,
        icon,
        stars,
        set,
        description
      } = artifact;

      return {
        id,
        name: decryptTextAsset(name),
        equipType,
        equipTypeName: decryptTextAsset(equipTypeName),
        icon: icon.url,
        stars,
        description: decryptTextAsset(description),
        set: {
          id: set.id,
          name: decryptTextAsset(set.name),
          icon: set.icon.url
        }
      };
    });

    return artifacts;
  } catch (error) {
    console.log("Error fetching artifacts", error);
    return [];
  }
};

export const getAllArtifactSets = async () => {
  try {
    const [artifactSets, artifacts] = await Promise.all([
      getAllArtifactSetsFromEnka(),
      getAllArtifactsFromEnka()
    ]);
    const setRarities = new Map();

    artifacts.forEach((artifact) => {
      const setId = artifact.set.id.toString();
      const rarity = artifact.stars;

      if (!setRarities.has(setId)) {
        setRarities.set(setId, new Set());
      }

      setRarities.get(setId).add(rarity);
    });

    const mappedArtifactSets = artifactSets.map((artifactSet) => {
      const { id, name, icon } = artifactSet;
      const setId = id.toString();
      const rarities: number[] = setRarities.has(setId)
        ? Array.from(setRarities.get(setId))
        : [];
      return {
        id,
        name: decryptTextAsset(name),
        icon: icon.url,
        rarities,
        highestRarity: Math.max(...rarities)
      };
    });

    return mappedArtifactSets;
  } catch (error) {
    console.log("Error fetching artifact sets", error);
    return [];
  }
};

export const getArtifactSetById = async (id: string) => {
  try {
    const [artifactSet, artifactSets, artifacts] = await Promise.all([
      getArtifactSetByIdFromEnka(id),
      getAllArtifactSets(),
      getAllArtifacts()
    ]);

    const { name, icon, setBonus } = artifactSet;

    const artifactCollection = getArtifactCollection(artifacts, id);

    return {
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      artifactNotFoundError(error.message, id);
    }

    // If the error is something else, rethrow it or return a generic error
    throw new Error("Internal Server Error");
  }
};
