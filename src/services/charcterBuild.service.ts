import CharacterBuildModel from "../models/characterBuild.model";
import { ICharacterBuildInput } from "../types/characterBuild.types";

const createCharacterBuild = async (
  input: Omit<ICharacterBuildInput, "createdAt" | "updatedAt">
) => {
  return CharacterBuildModel.create(input);
};

const findAllCharacterBuilds = async () => {
  return CharacterBuildModel.find().lean();
};

export { createCharacterBuild, findAllCharacterBuilds };
