import {
  getAllArtifactSetsFromEnka,
  getAllArtifactsFromEnka
} from "../services/enkaClient.service";
import decryptTextAsset from "./decryptTextAssets";

export const fetchAllArtifacts = async () => {
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
};

export const fetchAllArtifactSets = async () => {
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
};
