import { createCharacterBuild } from "../services/charcterBuild.service";
import { ICharacterBuildInput } from "../types/characterBuild.types";

export const createCharacterBuildHandler = async (
  body: ICharacterBuildInput
) => {
  try {
    const build = await createCharacterBuild(body);

    return build;
  } catch (error) {
    console.error("Error creating character build", error);
    throw new Error("Error creating character build");
  }
};
