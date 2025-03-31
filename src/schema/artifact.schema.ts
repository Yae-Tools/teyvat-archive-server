import { t } from "elysia";

const artifactIdValidation = {
  params: t.Object({
    id: t.String({ error: "Invalid artifact id" })
  })
};

export { artifactIdValidation };
