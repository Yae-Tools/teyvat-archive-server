import { NotFoundError } from "elysia";

const artifactNotFoundError = (errorMsg: string, id: string) => {
  if (errorMsg.includes("ArtifactSet") && errorMsg.includes("was not found")) {
    throw new NotFoundError(`Artifact set with ID ${id} not found.`);
  }
};

const characterNotFoundError = (
  errorMsg: string,
  characterId: number,
  skillDepotId: number
) => {
  if (errorMsg.includes("Character") && errorMsg.includes("was not found")) {
    throw new NotFoundError(`Character with ID ${characterId} not found.`);
  }

  if (errorMsg.includes("Skill Depot") && errorMsg.includes("was not found")) {
    throw new NotFoundError(`Skill Depot with ID ${skillDepotId} not found.`);
  }
};

const materialNotFoundError = (errorMsg: string, id: string) => {
  if (errorMsg.includes("Material") && errorMsg.includes("was not found")) {
    throw new NotFoundError(`Material with ID ${id} not found.`);
  }
};

const weaponNotFoundError = (errorMsg: string, id: string) => {
  if (errorMsg.includes("Weapon") && errorMsg.includes("was not found")) {
    throw new NotFoundError(`Weapon with ID ${id} not found.`);
  }
};

export {
  artifactNotFoundError,
  characterNotFoundError,
  materialNotFoundError,
  weaponNotFoundError,
};
