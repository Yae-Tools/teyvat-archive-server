import type { DomainType } from "../types/enka.type";

export function getDomainType(name: string): DomainType {
  if (name.includes("Domain of Forgery")) {
    return "WEAPON_ASC";
  }
  if (name.includes("Domain of Mastery")) {
    return "CHAR_ASC";
  }
  return "CHAR_ASC";
}
