import { t } from "elysia";

const materialIdValidation = {
  params: t.Object({
    id: t.String({ error: "Invalid material id" }),
  }),
};

export { materialIdValidation };
