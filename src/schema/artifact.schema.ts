import { object, string, type TypeOf } from "zod";

const params = object({
  id: string({
    required_error: "Id is required",
    invalid_type_error: "Id must be a string"
  })
});

const getArtifactSetByIdSchema = {
  params
};

type GetArtifactSetByIdInput = {
  params: TypeOf<typeof params>;
};

export { getArtifactSetByIdSchema, type GetArtifactSetByIdInput };
