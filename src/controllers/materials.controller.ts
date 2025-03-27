import { getMaterialByEnkaId } from "../services/enkaClient.service";
import { decryptTextAsset } from "../utils/enkaAssetMapper";
import { materialNotFoundError } from "../utils/errorMessageInterceptor";

export const getMaterialById = (id: string) => {
  try {
    const response = getMaterialByEnkaId(Number(id));

    const materialData = {
      enkaId: response.id,
      name: decryptTextAsset(response.name),
      description: decryptTextAsset(response.description),
      icon: response.icon?.url,
      materialType: response.materialType,
      itemType: response.itemType,
      stars: response.stars,
      picture: response.pictures,
    };

    return materialData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      materialNotFoundError(error.message, id);
    } else {
      throw new Error("Internal Server Error");
    }
  }
};
