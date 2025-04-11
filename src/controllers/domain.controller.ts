import { fetchDailyDomainInfo } from "../services/system.service";
import { IDailyDomainDataResponse } from "../types/domain.types";
import { domainsNotFoundError } from "../utils/errorMessageInterceptor";

export const getDailyDomainData = async () => {
  try {
    const response = await fetchDailyDomainInfo();

    const dailyDomainParsed = JSON.parse(response!);
    const dailyDomainData: IDailyDomainDataResponse = dailyDomainParsed.data;

    return dailyDomainData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      domainsNotFoundError(error.message);
    } else {
      throw new Error("Internal Server Error");
    }
  }
};
