import { getCharactersForMaterial } from "../services/domain.service";
import { getMaterialByEnkaId } from "../services/enkaClient.service";
import decryptTextAsset from "./decryptTextAssets";

const getMaterialDataHelper = (id: number) => {
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
    usedBy:
      response.materialType == "MATERIAL_AVATAR_MATERIAL"
        ? getCharactersForMaterial(response.id)
        : []
  };

  return materialData;
};

export default getMaterialDataHelper;
