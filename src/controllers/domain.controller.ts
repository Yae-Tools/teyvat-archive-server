import { fetchDailyDomainInfo } from "../services/system.service";
import {
  DateEnum,
  IDailyDomainData,
  IDailyDomainDataResponse,
  IRewardData
} from "../types/domain.types";
import { domainsNotFoundError } from "../utils/errorMessageInterceptor";
import { getMaterialById } from "./materials.controller";

const fetchRewardData = (id: number): IRewardData | null => {
  try {
    const rewardData = getMaterialById(id.toString());
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

export const getDailyDomainData = async () => {
  try {
    const response = await fetchDailyDomainInfo();
    const { data: dailyDomainData }: IDailyDomainDataResponse = JSON.parse(
      response!
    );

    return Object.entries(dailyDomainData).map(([day, domains]) => ({
      day: day as DateEnum,
      domains: Object.entries(domains as Record<string, IDailyDomainData>).map(
        ([id, domain]) => ({
          id,
          name: domain.name,
          reward: domain.reward
            .map(fetchRewardData)
            .filter(Boolean) as IRewardData[],
          city: domain.city
        })
      )
    }));
  } catch (error: unknown) {
    if (error instanceof Error) {
      domainsNotFoundError(error.message);
    } else {
      throw new Error("Internal Server Error");
    }
  }
};
