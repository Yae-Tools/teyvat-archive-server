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
} from "enka-network-api";
import { LanguageCode } from "enka-network-api/dist/client/CachedAssetsManager";

function decryptTextAsset(param: TextAssets | undefined, lang = "en") {
  try {
    if (param) return param.get(lang as LanguageCode);
  } catch (error) {
    return "";
  }
}

function mapSkills(skills: Skill[]): any[] {
  return skills.map((skill) => ({
    id: skill.id,
    name: decryptTextAsset(skill.name),
    description: decryptTextAsset(skill.description),
    icon: skill.icon?.url,
  }));
}

function mapPassiveTalents(passiveTalents: PassiveTalent[]): any[] {
  return passiveTalents.map((passive) => ({
    id: passive.id,
    name: decryptTextAsset(passive.name),
    description: decryptTextAsset(passive.description),
    icon: passive.icon?.url,
  }));
}

function mapConstellations(constellations: Constellation[]): any[] {
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
  abilityData: ElementalBurst | ElementalSkill | NormalAttack
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
    (_, i) => characterData.getAscensionData(i + 1)._data
  );
}

export {
  decryptTextAsset,
  mapAbility,
  mapAscensionData,
  mapConstellations,
  mapCostumes,
  mapPassiveTalents,
  mapSkills,
};
