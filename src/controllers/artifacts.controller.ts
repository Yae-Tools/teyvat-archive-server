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
    const response = getAllArtifactSetsFromEnka();

    const artifactSets = response.map((artifactSet) => {
      const { id, name, icon } = artifactSet;

      return {
        id,
        name: decryptTextAsset(name),
        icon: icon.url,
      };
    });

    return artifactSets;
  } catch (error) {
    console.log("Error fetching artifact sets", error);
    return [];
  }
};
