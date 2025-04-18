import { Kysely, sql } from "kysely";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>) {
  // create enum for user roles
  await db.schema
    .createType("user_role")
    .asEnum(["regular", "admin", "mod"])
    .execute();

  // create user_profiles table
  await db.schema
    .createTable("user_profiles")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("user_id", "uuid", (col) =>
      col.notNull().references("auth.users.id").onDelete("cascade").unique()
    )
    .addColumn("role", sql`user_role`, (col) =>
      col.notNull().defaultTo("regular")
    )
    .addColumn("profile_picture", "text", (col) => col.defaultTo(null))
    //make display name same as user id by default
    // this will be updated by the user later
    // this is a temporary solution until we have a better way to handle display names
    .addColumn("display_name", "text", (col) => col.defaultTo(null))
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .execute();

  //add index for faster lookups
  await db.schema
    .createIndex("user_profiles_user_id_index")
    .on("user_profiles")
    .column("user_id")
    .execute();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>) {
  // drop user_profiles table
  await db.schema.dropTable("user_profiles").execute();

  // drop user_role enum
  await db.schema.dropType("user_role").execute();

  // drop index
  await db.schema.dropIndex("user_profiles_user_id_index").execute();
}
