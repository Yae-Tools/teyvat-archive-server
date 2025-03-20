import { CharacterData } from "enka-network-api";
import {
  getAllCharactersFromEnka,
  getCharacterByIdFromEnka,
} from "../services/enkaClient.service";
import {
  decryptTextAsset,
  mapAscensionData,
  mapCharacterRegion,
  mapConstellations,
  mapPassiveTalents,
  mapSkills,
} from "../utils/enkaAssetMapper";
import uniqueIdMapper from "../utils/uniqueIdMapper";

export const getAllCharacters = async () => {
  try {
    const response = getAllCharactersFromEnka();

    const characters = response.map((character) => {
      const {
        _nameId,
        rarity,
        icon,
        element,
        skillDepotId,
        isTraveler,
        id,
        weaponType,
      } = character;

      return {
        id: uniqueIdMapper(_nameId, skillDepotId).toLowerCase(),
        enkaId: id,
        name: decryptTextAsset(character.name),
        nameId: _nameId,
        skillDepotId,
        rarity,
        iconUrl: icon.url,
        nameCard: character.nameCard?.pictures[0].url,
        element: element ? decryptTextAsset(element?.name) : null,
        isTraveler,
        weaponType,
      };
    });

    return characters;
  } catch (error) {
    console.log("Error fetching characters", error);
    return [];
  }
};

export const getCharacterBySkillDepotId = async (
  charcterId: string,
  skillDepotId: number,
) => {
  try {
    const response: CharacterData = getCharacterByIdFromEnka(
      charcterId,
      skillDepotId,
    );

    const skills = mapSkills(response.skills);
    const passiveTalents = mapPassiveTalents(response.passiveTalents);
    const constellations = mapConstellations(response.constellations);
    const ascensionData = mapAscensionData(response);
    const region = await mapCharacterRegion(response.id);

    const {
      _nameId,
      id: enkaId,
      rarity,
      icon,
      name,
      element,
      weaponType,
      splashImage,
      details,
      nameCard,
      isTraveler,
      stars,
      sideIcon,
      releasedAt,
      isArchon,
      bodyType,
    } = response;

    const character = {
      id: uniqueIdMapper(_nameId, skillDepotId).toLowerCase(),
      enkaId,
      skillDepotId,
      name: decryptTextAsset(name),
      nameId: _nameId,
      sideIcon: sideIcon.url,
      rarity,
      stars,
      iconUrl: icon.url,
      splashUrl: splashImage.url,
      nameCard: nameCard?.pictures[0].url,
      element: decryptTextAsset(element?.name),
      constellations,
      location: {
        faction: decryptTextAsset(details?.location),
        region: !isTraveler ? region : "Unknown",
      },
      vision: decryptTextAsset(details?.vision),
      constellation: decryptTextAsset(details?.constellation),
      constellationIcon: details?.constellationIcon?.url,
      title: decryptTextAsset(details?.title),
      description: decryptTextAsset(details?.description),
      weaponType,
      skills,
      passiveTalents,
      ascensionData,
      isTraveler,
      releasedAt,
      isArchon,
      birthday: details?.birthday,
      bodyType,
    };

    return character;
  } catch (error) {
    console.log("Error fetching character by skill depot id", error);
    return null;
  }
};

export const getAllCharacterLocations = async () => {
  try {
    const response: CharacterData[] = getAllCharactersFromEnka();

    const characterLocationData = response.map((character) => {
      const { _nameId, details } = character;
      return {
        skillDepotId: character.skillDepotId,
        nameId: _nameId,
        enkaId: character.id,
        location: decryptTextAsset(details?.location),
      };
    });

    return characterLocationData;
  } catch (error) {
    console.log("Error fetching character locations", error);
    return [];
  }
};
