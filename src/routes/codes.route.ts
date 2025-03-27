import Elysia from "elysia";
import { getAllRedeemCodes } from "../controllers/codes.controller";
import codeSwagger from "../swagger/code.swagger";

export const codeRoutes = async (app: Elysia) => {
  app.group("/codes", (codes) => {
    codes.get(
      "/all",
      async () => {
        return getAllRedeemCodes();
      },
      {
        detail: codeSwagger.all,
      }
    );

    return codes;
  });
};
