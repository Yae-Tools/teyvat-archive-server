import { ArtifactData } from "enka-network-api";
import { getAllArtifactsFromEnka } from "../services/enkaClient.service";
import { decryptTextAsset } from "../utils/enkaAssetMapper";

export const getAllArtifacts = async () => {
  try {
    const response: ArtifactData[] = getAllArtifactsFromEnka();

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
