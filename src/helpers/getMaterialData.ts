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
    picture: response.pictures
  };

  return materialData;
};

export default getMaterialDataHelper;
