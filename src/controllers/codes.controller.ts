import { fetchRedeemCodes } from "../services/system.service";

export const getAllRedeemCodes = async () => {
  try {
    const redeemCodesResponse = await fetchRedeemCodes();

    const redeemCodesParsed = JSON.parse(redeemCodesResponse ?? "{}");

    return redeemCodesParsed;
  } catch (error: unknown) {
    console.log("Error fetching redeem codes", error);
    return [];
  }
};
