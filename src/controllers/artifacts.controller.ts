import { ArtifactData } from "enka-network-api";
import {
  getAllArtifactSetsFromEnka,
  getAllArtifactsFromEnka,
} from "../services/enkaClient.service";
import { decryptTextAsset } from "../utils/enkaAssetMapper";

export const getAllArtifacts = async () => {
  try {
    const response = getAllArtifactsFromEnka();

    const artifacts = response.map((artifact) => {
      const { id, name, equipType, equipTypeName, icon, stars, set } = artifact;

      return {
        id,
        name: decryptTextAsset(name),
        equipType,
        equipTypeName: decryptTextAsset(equipTypeName),
        icon: icon.url,
        stars,
        set: {
          id: set.id,
          name: decryptTextAsset(set.name),
          icon: set.icon.url,
        },
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
      getAllArtifactsFromEnka(),
    ]);

    // Create a map of set ID to highest rarity beforehand
    const setRarityMap = new Map<string, number>();
    artifacts.forEach((artifact) => {
      const setId = artifact.set.id.toString();
      const currentMax = setRarityMap.get(setId) || 3;
      setRarityMap.set(setId, Math.max(currentMax, artifact.stars));
    });

    const mappedArtifactSets = artifactSets.map((artifactSet) => {
      const { id, name, icon } = artifactSet;
      return {
        id,
        name: decryptTextAsset(name),
        icon: icon.url,
        highestRarity: setRarityMap.get(id.toString()) || 3,
      };
    });

    return mappedArtifactSets;
  } catch (error) {
    console.log("Error fetching artifact sets", error);
    return [];
  }
};
