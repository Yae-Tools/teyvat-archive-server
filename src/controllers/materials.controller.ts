import type { Request, Response } from "express";

import getMaterialDataHelper from "../helpers/getMaterialData";
import { type GetMaterialByIdInput } from "../schema/material.schema";
export const getMaterialById = (
  req: Request<GetMaterialByIdInput["params"]>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const materialData = getMaterialDataHelper(id);

    res.status(200).json(materialData);
  } catch (error: unknown) {
    res.status(404).json({ error: error });
  }
};
