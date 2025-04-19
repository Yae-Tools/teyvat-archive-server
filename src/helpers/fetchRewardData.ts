import getMaterialDataHelper from "./getMaterialData";

const fetchRewardData = (id: number) => {
  try {
    const rewardData = getMaterialDataHelper(id);
    return rewardData
      ? {
          id: rewardData.enkaId,
          name: rewardData.name,
          icon: rewardData.icon,
          stars: rewardData.stars
        }
      : null;
  } catch {
    return null;
  }
};

export default fetchRewardData;
