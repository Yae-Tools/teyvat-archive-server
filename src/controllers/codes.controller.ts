import type { Request, Response } from "express";
import { fetchRedeemCodes } from "../services/system.service";

export const getAllRedeemCodes = async (_req: Request, res: Response) => {
  try {
    const redeemCodesResponse = await fetchRedeemCodes();

    const redeemCodesParsed = JSON.parse(redeemCodesResponse ?? "{}");

    res.status(200).send(redeemCodesParsed);
  } catch (error: unknown) {
    console.log("Error fetching redeem codes", error);
    res.status(500).send({ error: error });
  }
};
