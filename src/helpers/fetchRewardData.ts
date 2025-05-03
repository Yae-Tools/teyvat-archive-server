import { getCharactersForMaterial } from "../services/domain.service";
import getMaterialDataHelper from "./getMaterialData";

const fetchRewardData = (id: number) => {
  try {
    const rewardData = getMaterialDataHelper(id);
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
