import type { Generated } from "kysely";

export type IUserRole = "regular" | "admin" | "mod";

export enum EUserRole {
  REGULAR = "regular",
  ADMIN = "admin",
  MOD = "mod"
}

export interface IDatabase {
  user_profiles: IUserProfileTbale;
  character_builds: ICharacterBuildTable;
  build_weapons: IBuildWeaponsTable;
  build_artifacts: IBuildArtifactsTable;
  build_artifact_sets: IBuildArtifactSetsTable;
}

export interface IUserProfileTbale {
  id: Generated<number>;
  user_id: string;
  role: IUserRole;
  profile_picture: string | null;
  display_name: string;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface IUserProfile {
  id: number;
  user_id: string;
  role: IUserRole;
  profile_picture: string | null;
  display_name: string;
  created_at: Date;
  updated_at: Date;
}

export interface IUserProfileInsert {
  user_id: string;
  role: IUserRole;
  profile_picture: string | null;
}

export interface ICharacterBuildTable {
  id: Generated<string>;
  author_id: string;
  character_id: string;
  build_name: string;
  last_updated_patch: string;
  main_stats: string;
  sub_stats: string;
  talent_priority: string;
  notes: string;
  talent_notes: string;
  stat_notes: string;
  weapon_notes: string;
  artifact_notes: string;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface ICharacterBuildInsert {
  author_id: string;
  character_id: string;
  build_name: string;
  last_updated_patch: string;
  main_stats: string;
  sub_stats: string;
  talent_priority: string;
  notes: string;
  talent_notes: string;
  stat_notes: string;
  weapon_notes: string;
  artifact_notes: string;
}
export interface ICharacterBuild extends ICharacterBuildInsert {
  id: string;
  created_at: Date;
  updated_at: Date;
}

export interface IBuildWeaponsTable {
  id: Generated<number>;
  build_id: string;
  weapon_id: number;
  refinement: number | null;
  rank: number;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface IBuildWeaponsInsert {
  build_id: string;
  weapon_id: number;
  refinement: number;
  rank: number;
}

export interface IBuildWeapons extends IBuildWeaponsInsert {
  id: number;
  created_at: Date;
  updated_at: Date;
}

export interface IBuildArtifactsTable {
  id: Generated<number>;
  build_id: string;
  rank: number;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface IBuildArtifactsInsert {
  build_id: string;
  rank: number;
}

export interface IBuildArtifacts extends IBuildArtifactsInsert {
  id: number;
  created_at: Date;
  updated_at: Date;
}

export interface IBuildArtifactSetsTable {
  id: Generated<number>;
  build_artifact_id: number;
  artifact_set_id: string;
  piece_count: number;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface IBuildArtifactSetsInsert {
  build_artifact_id: number;
  artifact_set_id: string;
  piece_count: number;
}

export interface IBuildArtifactSets extends IBuildArtifactSetsInsert {
  id: number;
  created_at: Date;
  updated_at: Date;
}
