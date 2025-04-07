/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CharacterData,
  CharacterDetails,
  Constellation,
  Costume,
  ElementalBurst,
  ElementalSkill,
  NormalAttack,
  PassiveTalent,
  TextAssets,
  WeaponData,
  WeaponRefinement
} from "enka-network-api";
import { LanguageCode } from "enka-network-api/dist/client/CachedAssetsManager";
import { ICustomArtifact, ICustomBaseArtifact } from "../types/enka.type";

const regionMap = new Map<string, string>([
  ["ASSOC_TYPE_MONDSTADT", "Mondstadt"],
  ["ASSOC_TYPE_LIYUE", "Liyue"],
  ["ASSOC_TYPE_INAZUMA", "Inazuma"],
  ["ASSOC_TYPE_SUMERU", "Sumeru"],
  ["ASSOC_TYPE_SNEZHNAYA", "Snezhnaya"],
  ["ASSOC_TYPE_FONTAINE", "Fontaine"],
  ["ASSOC_TYPE_NATLAN", "Natlan"],
  ["ASSOC_TYPE_FATUI", "Fatui"],
  ["ASSOC_TYPE_RANGER", "Ranger"]
]);

type SkillType = NormalAttack | ElementalSkill | ElementalBurst;

function decryptTextAsset(param: TextAssets | undefined, lang = "en") {
  try {
    if (param) return param.get(lang as LanguageCode);
  } catch (error: unknown) {
    return "";
  }
}

function mapSkills(characterData: CharacterData) {
  const { skills, normalAttack, elementalSkill, elementalBurst } =
    characterData;
  if (normalAttack && elementalSkill && elementalBurst) {
    const filteredSkills = skills.filter(
      (skill) =>
        skill.id !== normalAttack.id &&
        skill.id !== elementalSkill.id &&
        skill.id !== elementalBurst.id
    );

    const mappedSkills = filteredSkills.map((skill) => ({
      id: skill.id,
      name: decryptTextAsset(skill.name),
      description: decryptTextAsset(skill.description),
      icon: skill.icon?.url,
      data: skill._data
    }));

    const TALENT_LEVELS = 15;

    // Helper function to generate attributes
    function getAttributes(skill: SkillType) {
      const rawStats = Array.from({ length: TALENT_LEVELS }, (_, i) => {
        return skill.getSkillAttributes(i + 1).map((attribute) => {
          const data = attribute.getAttributeData();

          return {
            name: data.name,
            value: data.valueText,
            usedNumbers: data.usedNumbers,
            level: i + 1
          };
        });
      }).flat();

      return [...new Set(rawStats.map((stat) => stat.name))].map((name) => {
        const statsForName = rawStats.filter((stat) => stat.name === name);
        return {
          name,
          values: statsForName.map((stat) => ({
            level: stat.level,
            value: stat.value
          })),
          usedNumbers: statsForName.map((stat) => ({
            level: stat.level,
            value: stat.usedNumbers
          }))
        };
      });
    }

    function getAscensionCost(skill: SkillType) {
      const ascensionCost = Array.from({ length: TALENT_LEVELS }, (_, i) => {
        const asc = skill.getUpgradeCost(i + 1);
        return {
          level: i + 1,
          items: asc?.items.map((item) => ({
            count: item.count,
            materialId: item.material.id,
            materialName: decryptTextAsset(item.material.name),
            materialIcon: item.material.icon?.url,
            materialRarity: item.material.stars
          })),
          coins: asc?.coin
        };
      });

      return ascensionCost;
    }

    // Generate attributes for each skill type
    const normalAttackAttributes = getAttributes(normalAttack);
    const elementalSkillAttributes = getAttributes(elementalSkill);
    const elementalBurstAttributes = getAttributes(elementalBurst);
    const normalAttackAscensionCost = getAscensionCost(normalAttack);
    const elementalSkillAscensionCost = getAscensionCost(elementalSkill);
    const elementalBurstAscensionCost = getAscensionCost(elementalBurst);

    const mappedNormalAttack = {
      id: normalAttack.id,
      name: decryptTextAsset(normalAttack.name),
      description: decryptTextAsset(normalAttack.description),
      icon: normalAttack.icon?.url,
      stats: normalAttackAttributes,
      ascensionCost: normalAttackAscensionCost
    };

    const mappedElementalSkill = {
      id: elementalSkill.id,
      name: decryptTextAsset(elementalSkill.name),
      description: decryptTextAsset(elementalSkill.description),
      icon: elementalSkill.icon?.url,
      stats: elementalSkillAttributes,
      ascensionCost: elementalSkillAscensionCost
    };

    const mappedElementalBurst = {
      id: elementalBurst.id,
      name: decryptTextAsset(elementalBurst.name),
      description: decryptTextAsset(elementalBurst.description),
      icon: elementalBurst.icon?.url,
      stats: elementalBurstAttributes,
      ascensionCost: elementalBurstAscensionCost
    };

    // Rearrange them to a single array in the order of original skills
    const mappedAbilities = [
      mappedNormalAttack,
      mappedElementalSkill,
      mappedElementalBurst
    ];

    // Rearrange into a single array in the order of original skills
    const mappedSkillsWithAbilities = skills.map((originalSkill) => {
      // Check if this skill is one of the abilities (Normal Attack, Elemental Skill, Burst)
      const ability = mappedAbilities.find((a) => a.id === originalSkill.id);
      if (ability) {
        return ability;
      }
      // Otherwise, find it in mappedSkills (non-ability skills)
      const skill = mappedSkills.find((s) => s.id === originalSkill.id);
      return skill || null; // Return null if not found (shouldn't happen with proper data)
    });

    return mappedSkillsWithAbilities;
  }
}

function mapPassiveTalents(passiveTalents: PassiveTalent[]) {
  return passiveTalents.map((passive) => ({
    id: passive.id,
    name: decryptTextAsset(passive.name),
    description: decryptTextAsset(passive.description),
    icon: passive.icon?.url,
    data: passive._data
  }));
}

function mapConstellations(constellations: Constellation[]) {
  return constellations.map((cons) => ({
    id: cons.id,
    name: decryptTextAsset(cons.name),
    description: decryptTextAsset(cons.description),
    icon: cons.icon?.url
  }));
}

function mapCostumes(costumes: Costume[]) {
  return costumes.map((costume) => ({
    id: costume.id,
    name: decryptTextAsset(costume.name),
    description: decryptTextAsset(costume.description),
    icon: costume.icon?.url
  }));
}

function mapAbility(
  abilityData: ElementalBurst | ElementalSkill | NormalAttack
) {
  if (!abilityData) return null;

  const { id, name, description } = abilityData;
  const icon = abilityData.icon?.url;

  return {
    id,
    name: decryptTextAsset(name),
    description: decryptTextAsset(description),
    icon
  };
}

function mapAscensionData(characterData: CharacterData) {
  const ascensionLevels = 7;

  const ascensionData = Array.from({ length: ascensionLevels }, (_, i) => {
    const data = characterData.getAscensionData(i);
    return {
      level: i,
      ascension: data.ascension,
      unlockMaxLevel: data.unlockMaxLevel,
      requiredAdventureRank: data.requiredAdventureRank,
      items: data.cost.items.map((item) => ({
        count: item.count,
        materialId: item.material.id,
        materialName: decryptTextAsset(item.material.name),
        materialIcon: item.material.icon?.url,
        materialRarity: item.material.stars
      })),
      addProps: data.addProps.map((prop) => ({
        fightProp: prop.fightProp,
        fightPropName: decryptTextAsset(prop.fightPropName),
        isPercent: prop.isPercent,
        rawValue: prop.rawValue,
        value: prop.value,
        multiplier: prop.getMultipliedValue()
      })),
      data: data._data
    };
  });

  // Remove undefined values
  const filteredAscensionData = ascensionData.filter(
    (ascension) => ascension !== undefined
  );
  // Remove duplicates
  const uniqueAscensionData = filteredAscensionData.filter(
    (ascension, index, self) =>
      index === self.findIndex((a) => a.ascension === ascension.ascension)
  );
  // Sort by ascension level
  const sortedAscensionData = uniqueAscensionData.toSorted(
    (a, b) => a.ascension - b.ascension
  );
  return sortedAscensionData.map((ascension) => ({
    level: ascension.level,
    unlockMaxLevel: ascension.unlockMaxLevel,
    requiredAdventureRank: ascension.requiredAdventureRank,
    items: ascension.items,
    addProps: ascension.addProps,
    coins: ascension.data.scoinCost
  }));
}

async function mapCharacterRegion(details: CharacterDetails) {
  const { _data } = details;

  const regionId = _data.avatarAssocType as string;

  // Return mapped region or default
  return regionMap.get(regionId) ?? "Unknown Region";
}

function mapRefinemetData(refinements: WeaponRefinement[]) {
  return refinements.map((refinement) => {
    const { name, description, id, level, paramList } = refinement;

    return {
      name: decryptTextAsset(name),
      description: decryptTextAsset(description),
      id,
      level,
      paramList
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
    { ascension: 6, start: 80, end: 90 }
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
            multiplier: stat.getMultipliedValue()
          };
        });
      })
  );

  //Remove empty arrays and flatten the array
  const sanitizedStats = unsanitizedStats.flat();

  return sanitizedStats.reduce(
    (
      acc: {
        [key: number]: {
          fightProp: string;
          fightPropName: string;
          isPercent: boolean;
          rawValue: number;
          value: number;
          multiplier: number;
        }[];
      },
      stat
    ) => {
      const level = stat.level;
      if (!acc[level]) {
        acc[level] = [];
      }
      acc[level].push({
        fightProp: stat.fightProp,
        fightPropName: stat.fightPropName as string,
        isPercent: stat.isPercent,
        rawValue: stat.rawValue,
        value: stat.value,
        multiplier: stat.multiplier
      });
      return acc;
    },
    {}
  );
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
        description: artifact.description
      });
    }
  });

  return artifactCollection;
}

function releaseDateMapper(releasedAt: Date | null, skillDepotId: number) {
  let releaseDate = releasedAt;

  const dateToISO = (date: string) => {
    const parsedDate = new Date(date);

    const year = parsedDate.getUTCFullYear();
    const month = parsedDate.getUTCMonth(); // 0-indexed
    const day = parsedDate.getUTCDate();

    const utcDate = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));

    return utcDate;
  };

  if (releaseDate === null) {
    switch (skillDepotId) {
      case 504:
      case 506:
      case 704:
      case 706:
        releaseDate = dateToISO("September 28, 2020");
        break;
      case 507:
      case 707:
        releaseDate = dateToISO("July 21, 2021");
        break;
      case 508:
      case 708:
        releaseDate = dateToISO("August 24, 2022");
        break;
      case 503:
      case 703:
        releaseDate = dateToISO("August 16, 2023");
        break;
      case 502:
      case 702:
        releaseDate = dateToISO("August 28, 2024");
        break;
    }
    //need to get first release character from each region
  }

  return releaseDate;
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
  releaseDateMapper
};
