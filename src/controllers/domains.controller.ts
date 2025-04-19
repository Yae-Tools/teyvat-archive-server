import type { Request, Response } from "express";
import { fetchDailyDomainInfo } from "../services/system.service";
import type {
  DateEnum,
  IDailyDomainData,
  IDailyDomainDataResponse,
  IRewardData
} from "../types/domain.types";
import fetchRewardData from "../helpers/fetchRewardData";

export const getDailyDomainData = async (_req: Request, res: Response) => {
  try {
    const response = await fetchDailyDomainInfo();
    const { data: dailyDomainData }: IDailyDomainDataResponse = JSON.parse(
      response!
    );

    const cx = Object.entries(dailyDomainData).map(([day, domains]) => ({
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

    res.status(200).send(cx);
  } catch (error) {
    res.status(404).send({ error: error });
  }
};
