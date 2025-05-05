import type { IAbyssCharacter, IAbyssPartyData } from "../types/abyss.types";

export const parsePartyData = (partyData: IAbyssPartyData[]) => {
  return partyData.map((party) => ({
    characterIds: party.id.split(",").map((id) => id.trim()),
    value: party.value,
    ownRate: party.own_rate,
    useByOwnRate: party.use_by_own_rate
  }));
};

export const parseCharacterData = (characterData: IAbyssCharacter) => {
  return Object.keys(characterData).map((key) => {
    const character = characterData[key];
    return {
      id: key,
      useRate: character.use_rate,
      ownRate: character.own_rate,
      useByOwnRate: character.use_by_own_rate,
      weapons: character.weapons.map((weapon) => ({
        id: weapon.id,
        value: weapon.value
      })),
      artifacts: character.artifacts.map((artifact) => ({
        set: artifact.set,
        value: artifact.value
      })),
      constellations: character.constellations.map((constellation) => ({
        id: constellation.id,
        value: constellation.value
      }))
    };
  });
};

export const starsToRarity = (stars: number) => {
  switch (stars) {
    case 1:
      return "QUALITY_GRAY";
    case 2:
      return "QUALITY_GREEN";
    case 3:
      return "QUALITY_BLUE";
    case 4:
      return "QUALITY_PURPLE";
    case 5:
      return "QUALITY_ORANGE";
    default:
      return "QUALITY_GRAY";
  }
};
