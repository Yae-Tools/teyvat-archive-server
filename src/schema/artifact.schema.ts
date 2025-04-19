import { object, string, type TypeOf } from "zod";

const params = object({
  id: string({
    required_error: "Id is required",
    invalid_type_error: "Id must be a string"
  })
});

const getArtifactSetByIdSchema = object({
  params
});

type GetArtifactSetByIdInput = TypeOf<typeof getArtifactSetByIdSchema>;

export { getArtifactSetByIdSchema, type GetArtifactSetByIdInput };
