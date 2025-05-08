import {
  CharacterData,
  CharacterDetails,
  Constellation,
  Costume,
  PassiveTalent,
  WeaponData,
  WeaponRefinement
} from "enka-network-api";
import type {
  ICustomArtifact,
  ICustomBaseArtifact,
  SkillType
} from "../types/enka.type";
import decryptTextAsset from "../helpers/decryptTextAssets";
import { regionMap } from "./maps/regionMap";

export function mapSkills(characterData: CharacterData) {
  const { skills, normalAttack, elementalSkill, elementalBurst } =
    characterData;

  // Early return if required data is missing
  if (!normalAttack || !elementalSkill || !elementalBurst) {
    return [];
  }

  const TALENT_LEVELS = 15;
  const abilityIds = new Set([
    normalAttack.id,
    elementalSkill.id,
    elementalBurst.id
  ]);

  // Helper function to generate attributes (extracted to reduce duplication)
  function getAttributes(skill: SkillType) {
    const attributesByName = new Map();

    for (let level = 1; level <= TALENT_LEVELS; level++) {
      const attributes = skill.getSkillAttributes(level);

      for (const attribute of attributes) {
        const data = attribute.getAttributeData();
        const { name, valueText: value, usedNumbers } = data;

        if (!attributesByName.has(name)) {
          attributesByName.set(name, {
            name,
            values: [],
            usedNumbers: []
          });
        }

        const entry = attributesByName.get(name);
        entry.values.push({ level, value });
        entry.usedNumbers.push({ level, value: usedNumbers });
      }
    }

    return Array.from(attributesByName.values());
  }

  // Helper function to get ascension costs (extracted to reduce duplication)
  function getAscensionCost(skill: SkillType) {
    return Array.from({ length: TALENT_LEVELS }, (_, i) => {
      const level = i + 1;
      const asc = skill.getUpgradeCost(level);

      return {
        level,
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
  }

  // Process the three main abilities
  const mappedNormalAttack = {
    id: normalAttack.id,
    name: decryptTextAsset(normalAttack.name),
    description: decryptTextAsset(normalAttack.description),
    icon: normalAttack.icon?.url,
    stats: getAttributes(normalAttack),
    ascensionCost: getAscensionCost(normalAttack)
  };

  const mappedElementalSkill = {
    id: elementalSkill.id,
    name: decryptTextAsset(elementalSkill.name),
    description: decryptTextAsset(elementalSkill.description),
    icon: elementalSkill.icon?.url,
    stats: getAttributes(elementalSkill),
    ascensionCost: getAscensionCost(elementalSkill)
  };

  const mappedElementalBurst = {
    id: elementalBurst.id,
    name: elementalBurst.name.toString(),
    description: elementalBurst.description.toString(),
    icon: elementalBurst.icon?.url,
    stats: getAttributes(elementalBurst),
    ascensionCost: getAscensionCost(elementalBurst)
  };

  // Create a map for quick lookup of the three main abilities
  const abilityMap = new Map([
    [normalAttack.id, mappedNormalAttack],
    [elementalSkill.id, mappedElementalSkill],
    [elementalBurst.id, mappedElementalBurst]
  ]);

  // Process the non-ability skills
  const mappedSkills = skills
    .filter((skill) => !abilityIds.has(skill.id))
    .map((skill) => ({
      id: skill.id,
      name: skill.name.toString(),
      description: skill.description.toString(),
      icon: skill.icon?.url,
      data: skill._data
    }));
  // Map all skills in original order
  return skills
    .filter(
      (skill) =>
        !skill.name.toString().toLowerCase().includes("unknown") ||
        !skill.description.toString().toLowerCase().includes("unknown")
    )
    .map((originalSkill) => {
      if (abilityIds.has(originalSkill.id)) {
        return abilityMap.get(originalSkill.id);
      }
      return mappedSkills.find((s) => s.id === originalSkill.id) || null;
    });
}

export function mapPassiveTalents(passiveTalents: PassiveTalent[]) {
  const pa = passiveTalents
    .filter((skill) => !skill.name.toString().toLowerCase().includes("unknown"))
    .map((passive) => ({
      id: passive.id,
      name: decryptTextAsset(passive.name),
      description: decryptTextAsset(passive.description),
      icon: passive.icon?.url,
      data: passive._data
    }));

  console.log("mappedPassiveTalents", pa);
  return pa;
}

export function mapConstellations(constellations: Constellation[]) {
  return constellations.map((cons) => ({
    id: cons.id,
    name: decryptTextAsset(cons.name),
    description: decryptTextAsset(cons.description),
    icon: cons.icon?.url
  }));
}

export function mapCostumes(costumes: Costume[]) {
  return costumes.map((costume) => ({
    id: costume.id,
    name: decryptTextAsset(costume.name),
    description: decryptTextAsset(costume.description),
    icon: costume.icon?.url
  }));
}

export function mapAbility(abilityData: SkillType) {
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

export function mapAscensionData(characterData: CharacterData) {
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

export async function mapCharacterRegion(details: CharacterDetails) {
  const { _data } = details;

  const regionId = _data.avatarAssocType as string;

  // Return mapped region or default
  return regionMap.get(regionId) ?? "Unknown Region";
}

export function mapRefinemetData(refinements: WeaponRefinement[]) {
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

export function mapWeaponStats(weaonData: WeaponData) {
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
        fightPropName: stat.fightPropName,
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

export function getArtifactCollection(
  artifacts: ICustomArtifact[],
  setId: string
) {
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

export function mapReleaseDate(releasedAt: Date | null, skillDepotId: number) {
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
