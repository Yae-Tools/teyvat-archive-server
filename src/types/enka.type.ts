import type {
  ElementalBurst,
  ElementalSkill,
  EquipType,
  NormalAttack
} from "enka-network-api";

export interface ICustomBaseArtifact {
  id: number;
  equipType: EquipType;
  equipTypeName: string | undefined;
  name: string | undefined;
  icon: string | null;
  stars: number;
  description: string | undefined;
}

export interface ICustomArtifact extends ICustomBaseArtifact {
  set: {
    id: number;
    name: string | undefined;
    icon: string | null;
  };
}

export interface ICustomBaseCharacter {
  id: number;
  name: string;
  skillDepotId: number;
  iconUrl: string | null;
  element: string;
  isTraveler: boolean;
  rarity: string;
  nameId: string;
}

export interface ICustomBaseWeapon {
  id: number;
  nameId: string;
  name: string;
  iconUrl: string | null;
  rarity: string;
}

export type SkillType = NormalAttack | ElementalSkill | ElementalBurst;

export type DomainType = "WEAPON_ASC" | "CHAR_ASC";
