import { fetchRedeemCodes } from "../services/system.service";
import logger from "../utils/logger";

export const getAllRedeemCodes = async () => {
  try {
    const redeemCodesResponse = await fetchRedeemCodes();

    const redeemCodesParsed = JSON.parse(redeemCodesResponse);

    return redeemCodesParsed;
  } catch (error: unknown) {
    logger.error("Error fetching redeem codes", error);
    return [];
  }
};
