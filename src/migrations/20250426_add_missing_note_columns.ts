/* eslint-disable @typescript-eslint/no-explicit-any */
import { Kysely } from "kysely";

export async function up(db: Kysely<any>) {
  console.log("Adding missing note columns to character_builds table");

  // Check which columns already exist in character_builds table
  const existingColumns = await db
    .selectFrom("information_schema.columns")
    .select("column_name")
    .where("table_name", "=", "character_builds")
    .execute();

  const columnExists = (name: string) =>
    existingColumns.some((col) => col.column_name === name);

  // Add talent_notes if it doesn't exist
  if (!columnExists("talent_notes")) {
    await db.schema
      .alterTable("character_builds")
      .addColumn("talent_notes", "text", (col) => col.notNull().defaultTo(""))
      .execute();
    console.log("Added talent_notes column");
  } else {
    console.log("talent_notes column already exists");
  }

  // Add stat_notes if it doesn't exist
  if (!columnExists("stat_notes")) {
    await db.schema
      .alterTable("character_builds")
      .addColumn("stat_notes", "text", (col) => col.notNull().defaultTo(""))
      .execute();
    console.log("Added stat_notes column");
  } else {
    console.log("stat_notes column already exists");
  }

  // Add weapon_notes if it doesn't exist
  if (!columnExists("weapon_notes")) {
    await db.schema
      .alterTable("character_builds")
      .addColumn("weapon_notes", "text", (col) => col.notNull().defaultTo(""))
      .execute();
    console.log("Added weapon_notes column");
  } else {
    console.log("weapon_notes column already exists");
  }

  // Add artifact_notes if it doesn't exist
  if (!columnExists("artifact_notes")) {
    await db.schema
      .alterTable("character_builds")
      .addColumn("artifact_notes", "text", (col) => col.notNull().defaultTo(""))
      .execute();
    console.log("Added artifact_notes column");
  } else {
    console.log("artifact_notes column already exists");
  }

  // Check refinement column nullability in build_weapons table
  const refinementColumnInfo = await db
    .selectFrom("information_schema.columns")
    .select(["column_name", "is_nullable"])
    .where("table_name", "=", "build_weapons")
    .where("column_name", "=", "refinement")
    .executeTakeFirst();

  // Make refinement nullable if it's currently not nullable
  if (refinementColumnInfo && refinementColumnInfo.is_nullable === "NO") {
    await db.schema
      .alterTable("build_weapons")
      .alterColumn("refinement", (col) => col.dropNotNull())
      .execute();
    console.log("Made refinement column nullable");
  } else {
    console.log("refinement column is already nullable or doesn't exist");
  }

  console.log("Migration completed successfully");
}

export async function down(db: Kysely<any>) {
  console.log("Removing added note columns from character_builds table");

  // Check which columns exist in character_builds table
  const existingColumns = await db
    .selectFrom("information_schema.columns")
    .select("column_name")
    .where("table_name", "=", "character_builds")
    .execute();

  const columnExists = (name: string) =>
    existingColumns.some((col) => col.column_name === name);

  // Drop talent_notes if it exists
  if (columnExists("talent_notes")) {
    await db.schema
      .alterTable("character_builds")
      .dropColumn("talent_notes")
      .execute();
    console.log("Dropped talent_notes column");
  }

  // Drop stat_notes if it exists
  if (columnExists("stat_notes")) {
    await db.schema
      .alterTable("character_builds")
      .dropColumn("stat_notes")
      .execute();
    console.log("Dropped stat_notes column");
  }

  // Drop weapon_notes if it exists
  if (columnExists("weapon_notes")) {
    await db.schema
      .alterTable("character_builds")
      .dropColumn("weapon_notes")
      .execute();
    console.log("Dropped weapon_notes column");
  }

  // Drop artifact_notes if it exists
  if (columnExists("artifact_notes")) {
    await db.schema
      .alterTable("character_builds")
      .dropColumn("artifact_notes")
      .execute();
    console.log("Dropped artifact_notes column");
  }

  // Check refinement column nullability
  const refinementColumnInfo = await db
    .selectFrom("information_schema.columns")
    .select(["column_name", "is_nullable"])
    .where("table_name", "=", "build_weapons")
    .where("column_name", "=", "refinement")
    .executeTakeFirst();

  // Make refinement NOT NULL if it's currently nullable
  if (refinementColumnInfo && refinementColumnInfo.is_nullable === "YES") {
    await db.schema
      .alterTable("build_weapons")
      .alterColumn("refinement", (col) => col.setNotNull())
      .execute();
    console.log("Made refinement column NOT NULL again");
  }

  console.log("Rollback completed successfully");
}
