import { Generated } from "kysely";

export type IUserRole = "regular" | "admin" | "mod";

export interface IDatabase {
  user_profiles: IUserProfileTbale;
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
