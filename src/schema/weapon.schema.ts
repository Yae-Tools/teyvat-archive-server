import { t } from "elysia";

const weaponIdValidation = {
  params: t.Object({
    id: t.String({ error: "Invalid weapon id" })
  })
};

export { weaponIdValidation };
