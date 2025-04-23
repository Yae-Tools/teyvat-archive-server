import type { Request, Response } from "express";

import getMaterialDataHelper from "../helpers/getMaterialData";
import { type GetMaterialByIdInput } from "../schema/material.schema";
export const getMaterialById = (
  req: Request<GetMaterialByIdInput>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const materialData = getMaterialDataHelper(id);

    res.status(200).send(materialData);
  } catch (error: unknown) {
    res.status(404).send({ error: error });
  }
};
