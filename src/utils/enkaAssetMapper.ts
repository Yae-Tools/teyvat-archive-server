import {
  CharacterData,
  Constellation,
  Costume,
  ElementalBurst,
  ElementalSkill,
  NormalAttack,
  PassiveTalent,
  Skill,
  TextAssets,
  WeaponData,
  WeaponRefinement,
} from "enka-network-api";
import { LanguageCode } from "enka-network-api/dist/client/CachedAssetsManager";
import { fetchFetterInfoExcelConfigData } from "../services/system.service";
import { ICustomArtifact, ICustomBaseArtifact } from "../types/enka.type";

function decryptTextAsset(param: TextAssets | undefined, lang = "en") {
  try {
    if (param) return param.get(lang as LanguageCode);
  } catch (error) {
    return "";
  }
}

function mapSkills(skills: Skill[]) {
  return skills.map((skill) => ({
    id: skill.id,
    name: decryptTextAsset(skill.name),
    description: decryptTextAsset(skill.description),
    icon: skill.icon?.url,
  }));
}

function mapPassiveTalents(passiveTalents: PassiveTalent[]) {
  return passiveTalents.map((passive) => ({
    id: passive.id,
    name: decryptTextAsset(passive.name),
    description: decryptTextAsset(passive.description),
    icon: passive.icon?.url,
  }));
}

function mapConstellations(constellations: Constellation[]) {
  return constellations.map((cons) => ({
    id: cons.id,
    name: decryptTextAsset(cons.name),
    description: decryptTextAsset(cons.description),
    icon: cons.icon?.url,
  }));
}

function mapCostumes(costumes: Costume[]): any[] {
  return costumes.map((costume) => ({
    id: costume.id,
    name: decryptTextAsset(costume.name),
    description: decryptTextAsset(costume.description),
    icon: costume.icon?.url,
  }));
}

function mapAbility(
  abilityData: ElementalBurst | ElementalSkill | NormalAttack,
) {
  if (!abilityData) return null;

  const { id, name, description } = abilityData;
  const icon = abilityData.icon?.url;

  return {
    id,
    name: decryptTextAsset(name),
    description: decryptTextAsset(description),
    icon,
  };
}

function mapAscensionData(characterData: CharacterData) {
  const ascensionLevels = 6;
  return Array.from(
    { length: ascensionLevels },
    (_, i) => characterData.getAscensionData(i + 1)._data,
  );
}

async function mapCharacterRegion(characterId: number) {
  const fetterResponse: {
    avatarId: number;
    avatarAssocType: string;
  }[] = await fetchFetterInfoExcelConfigData();

  const fetterChar = fetterResponse.find(
    (fetter) => fetter.avatarId === characterId,
  );

  switch (fetterChar?.avatarAssocType) {
    case "ASSOC_TYPE_MONDSTADT":
      return "Mondstadt";
    case "ASSOC_TYPE_LIYUE":
      return "Liyue";
    case "ASSOC_TYPE_INAZUMA":
      return "Inazuma";
    case "ASSOC_TYPE_SUMERU":
      return "Sumeru";
    case "SNEZHNAYA":
      return "Snezhnaya";
    case "ASSOC_TYPE_FONTAINE":
      return "fontaine";
    case "ASSOC_TYPE_NATLAN":
      return "Natlan";
    case "ASSOC_TYPE_FATUI":
      return "Fatui";
    case "ASSOC_TYPE_RANGER":
      return "Ranger";
    default:
      return "other";
  }
}

function mapRefinemetData(refinements: WeaponRefinement[]) {
  return refinements.map((refinement) => {
    const { name, description, id, level, addProps, paramList } = refinement;

    return {
      name: decryptTextAsset(name),
      description: decryptTextAsset(description),
      id,
      level,
      paramList,
    };
  });
}

function mapWeaponStats(weaonData: WeaponData) {
  // ascension ascension level 0-6 for 3-5 stars, and 0-4 for 1-2 stars.
  // level weapon level 1-90 for 3-5 stars, and 1-70 for 1-2 stars.
  const maxAscensionLevels = weaonData.stars > 2 ? 6 : 4;
  const maxWeaponLevels = weaonData.stars > 2 ? 90 : 70;

  const ascensionRanges = [
    { ascension: 0, start: 1, end: 20 },
    { ascension: 1, start: 20, end: 40 },
    { ascension: 2, start: 40, end: 50 },
    { ascension: 3, start: 50, end: 60 },
    { ascension: 4, start: 60, end: 70 },
    { ascension: 5, start: 70, end: 80 },
    { ascension: 6, start: 80, end: 90 },
  ];

  const unsanitizedStats = ascensionRanges.flatMap(
    ({ ascension, start, end }) =>
      Array.from({ length: end - start + 1 }, (_, i) => {
        const level = start + i;
        if (level > maxWeaponLevels || ascension > maxAscensionLevels)
          return [];
        return weaonData.getStats(ascension, level).map((stat) => {
          return {
            level: level,
            fightProp: stat.fightProp,
            fightPropName: decryptTextAsset(stat.fightPropName),
            isPercent: stat.isPercent,
            rawValue: stat.rawValue,
            value: stat.value,
            multiplier: stat.getMultipliedValue(),
          };
        });
      }),
  );

  //Remove empty arrays and flatten the array
  const sanitizedStats = unsanitizedStats.flat();

  return sanitizedStats.reduce((acc: { [key: number]: any[] }, stat) => {
    const level = stat.level;
    if (!acc[level]) {
      acc[level] = [];
    }
    acc[level].push({
      fightProp: stat.fightProp,
      fightPropName: stat.fightPropName,
      isPercent: stat.isPercent,
      rawValue: stat.rawValue,
      value: stat.value,
      multiplier: stat.multiplier,
    });
    return acc;
  }, {});
}

function getArtifactCollection(artifacts: ICustomArtifact[], setId: string) {
  const artifactCollection: ICustomBaseArtifact[] = [];

  artifacts.forEach((artifact) => {
    if (artifact.set.id.toString() === setId) {
      artifactCollection.push({
        id: artifact.id,
        equipType: artifact.equipType,
        equipTypeName: artifact.equipTypeName as string,
        name: artifact.name as string,
        icon: artifact.icon as string,
        stars: artifact.stars,
      });
    }
  });

  return artifactCollection;
}

export {
  decryptTextAsset,
  mapAbility,
  mapAscensionData,
  mapConstellations,
  mapCostumes,
  mapPassiveTalents,
  mapSkills,
  mapRefinemetData,
  mapWeaponStats,
  mapCharacterRegion,
  getArtifactCollection,
};
