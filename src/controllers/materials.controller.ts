import type { Request, Response } from "express";
import getMaterialDataHelper from "../helpers/getMaterialData";

export const getMaterialById = (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const materialData = getMaterialDataHelper(Number(req.params.id));

    res.status(200).json(materialData);
  } catch (error: unknown) {
    res.status(404).json({ error: error });
  }
};
