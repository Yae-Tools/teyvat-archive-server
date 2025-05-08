import { CharacterData, CharacterDetails } from "enka-network-api";
import type { Request, Response } from "express";

import {
  getAllCharactersFromEnka,
  getCharacterByIdFromEnka
} from "../services/enkaClient.service";
import {
  mapAscensionData,
  mapCharacterRegion,
  mapConstellations,
  mapPassiveTalents,
  mapSkills,
  mapReleaseDate
} from "../utils/enkaAssetMapper";
import uniqueIdMapper from "../utils/uniqueIdMapper";
import decryptTextAsset from "../helpers/decryptTextAssets";
import type { GetCharacterByIdInput } from "../schema/character.schema";

export const getAllCharacters = async (_req: Request, res: Response) => {
  try {
    const response = getAllCharactersFromEnka();

    const characters = response
      .filter((char) => char.element !== null)
      .map((character) => {
        const {
          _nameId,
          rarity,
          icon,
          element,
          skillDepotId,
          isTraveler,
          id,
          weaponType
        } = character;

        const releasedAt = mapReleaseDate(
          character.releasedAt,
          character.skillDepotId
        );

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
          releasedAt
        };
      });

    res.status(200).send(characters);
  } catch (error) {
    console.log("Error fetching characters", error);
    res.status(500).send({ error: error });
  }
};

export const getCharacterBySkillDepotId = async (
  req: Request<
    GetCharacterByIdInput["params"],
    object,
    object,
    GetCharacterByIdInput["query"]
  >,
  res: Response
) => {
  try {
    const { characterId } = req.params;
    const { skillDepotId } = req.query;

    const response: CharacterData = getCharacterByIdFromEnka(
      characterId,
      skillDepotId
    );

    const ascensionData = mapAscensionData(response);
    const skills = mapSkills(response);
    const passiveTalents = mapPassiveTalents(response.passiveTalents);
    const constellations = mapConstellations(response.constellations);

    const region = await mapCharacterRegion(
      response.details as CharacterDetails
    );

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
      bodyType
    } = response;

    const character = {
      id: uniqueIdMapper(_nameId, Number(skillDepotId)).toLowerCase(),
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
        region: !isTraveler ? region : "Unknown"
      },
      vision: decryptTextAsset(details?.vision),
      constellation: decryptTextAsset(details?.constellation),
      constellationIcon: details?.constellationIcon?.url,
      title: isTraveler ? "The Outlander" : decryptTextAsset(details?.title),
      description: decryptTextAsset(details?.description),
      weaponType,
      skills,
      passiveTalents,
      ascensionData,
      isTraveler,
      releasedAt,
      isArchon,
      birthday: details?.birthday,
      bodyType
    };
    if (character) {
      res.status(200).send(character);
    } else {
      console.log("character not found");
      res.status(404).send({ error: "Character not found" });
    }
  } catch (error: unknown) {
    console.log("error", error);
    res.status(500).send({ error: error });
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
        location: decryptTextAsset(details?.location)
      };
    });

    return characterLocationData;
  } catch (error) {
    console.log("Error fetching character locations", error);
    return [];
  }
};
