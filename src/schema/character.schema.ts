import { t } from "elysia";

const characterIdValidation = {
  params: t.Object({
    id: t.Number({ error: "Invalid character id" }),
  }),
  query: t.Object({
    skillDepotId: t.Number({ error: "Invalid skill depot id" }),
  }),
};

export { characterIdValidation };
