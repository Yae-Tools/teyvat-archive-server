// services/userService.ts
import { Kysely } from "kysely";
import {
  EUserRole,
  type IDatabase,
  type IUserRole
} from "../types/database.types";

export class UserService {
  constructor(private readonly db: Kysely<IDatabase>) {}

  async createUserProfile(
    userId: string,
    role: IUserRole = EUserRole.REGULAR,
    profilePicture?: string,
    displayName?: string
  ) {
    return await this.db
      .insertInto("user_profiles")
      .values({
        user_id: userId,
        role,
        profile_picture: profilePicture ?? null,
        display_name: displayName ?? userId // Default to userId if no display name is provided
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async getUserProfile(userId: string) {
    return await this.db
      .selectFrom("user_profiles")
      .where("user_id", "=", userId)
      .selectAll()
      .executeTakeFirst();
  }

  async updateUserRole(userId: string, role: IUserRole) {
    return await this.db
      .updateTable("user_profiles")
      .set({
        role,
        updated_at: new Date() // We need to manually update this field
      })
      .where("user_id", "=", userId)
      .returningAll()
      .executeTakeFirstOrThrow();
  }
}
