import type { DomainType } from "../types/enka.type";
import getMaterialDataHelper from "./getMaterialData";

const fetchRewardData = (id: number, domainType: DomainType) => {
  try {
    const rewardData = getMaterialDataHelper(id, domainType);
    return rewardData
      ? {
          id: rewardData.enkaId,
          name: rewardData.name,
          icon: rewardData.icon,
          stars: rewardData.stars,
          materialType: rewardData.materialType,
          itemType: rewardData.itemType,
          usedBy: rewardData.usedBy
        }
      : null;
  } catch {
    return null;
  }
};

export default fetchRewardData;
