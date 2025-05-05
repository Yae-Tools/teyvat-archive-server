import {
  getCharactersForMaterial,
  getWeaponsForMaterial
} from "../services/domain.service";
import { getMaterialByEnkaId } from "../services/enkaClient.service";
import type { DomainType } from "../types/enka.type";
import decryptTextAsset from "./decryptTextAssets";

const getMaterialDataHelper = (id: number, domainType: DomainType) => {
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
      domainType === "CHAR_ASC"
        ? getCharactersForMaterial(response.id)
        : getWeaponsForMaterial(response.id)
  };

  return materialData;
};

export default getMaterialDataHelper;
