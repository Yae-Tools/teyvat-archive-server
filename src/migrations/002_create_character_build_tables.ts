/* eslint-disable @typescript-eslint/no-explicit-any */
import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>) {
  await db.schema
    .createTable("character_builds")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("build_name", "text", (col) => col.notNull())
    .addColumn("author_id", "uuid", (col) =>
      col.notNull().references("user_profiles.user_id").onDelete("cascade")
    )
    .addColumn("character_id", "text", (col) => col.notNull())
    .addColumn("last_updated_path", "text", (col) => col.notNull())
    .addColumn("main_stats", "jsonb", (col) => col.notNull())
    .addColumn("sub_stats", "jsonb", (col) => col.notNull())
    .addColumn("talent_priority", "jsonb", (col) => col.notNull())
    .addColumn("notes", "text", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .execute();

  //separate table for character build weapons | build-weapons relationship

  await db.schema
    .createTable("build_weapons")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("build_id", "integer", (col) =>
      col.notNull().references("character_builds.id").onDelete("cascade")
    )
    .addColumn("weapon_id", "text", (col) => col.notNull())
    .addColumn("refinement", "integer")
    .addColumn("rank", "integer", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .execute();

  //separate table for character build artifacts | build-artifacts relationship

  await db.schema
    .createTable("build_artifacts")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("build_id", "integer", (col) =>
      col.notNull().references("character_builds.id").onDelete("cascade")
    )
    .addColumn("rank", "integer", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .execute();

  // Table for artifact sets within a build (can be 4pc or 2pc + 2pc)
  await db.schema
    .createTable("build_artifact_sets")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("build_artifact_id", "integer", (col) =>
      col.notNull().references("build_artifacts.id").onDelete("cascade")
    )
    .addColumn("artifact_set_id", "text", (col) => col.notNull())
    .addColumn("piece_count", "integer", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .execute();

  // add index for faster lookups
  await db.schema
    .createIndex("character_builds_author_id_index")
    .on("character_builds")
    .column("author_id")
    .execute();

  await db.schema
    .createIndex("character_builds_character_id_index")
    .on("character_builds")
    .column("character_id")
    .execute();

  await db.schema
    .createIndex("build_weapons_build_id_index")
    .on("build_weapons")
    .column("build_id")
    .execute();

  await db.schema
    .createIndex("build_weapons_weapon_id_index")
    .on("build_weapons")
    .column("weapon_id")
    .execute();

  await db.schema
    .createIndex("build_artifacts_build_id_index")
    .on("build_artifacts")
    .column("build_id")
    .execute();

  await db.schema
    .createIndex("build_artifact_sets_build_artifact_id_index")
    .on("build_artifact_sets")
    .column("build_artifact_id")
    .execute();

  await db.schema
    .createIndex("build_artifact_sets_artifact_set_id_index")
    .on("build_artifact_sets")
    .column("artifact_set_id")
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable("build_artifact_sets").execute();
  await db.schema.dropTable("build_artifacts").execute();
  await db.schema.dropTable("build_weapons").execute();
  await db.schema.dropTable("character_builds").execute();

  await db.schema
    .dropIndex("character_builds_author_id_index")
    .on("character_builds")
    .execute();
  await db.schema
    .dropIndex("character_builds_character_id_index")
    .on("character_builds")
    .execute();
  await db.schema
    .dropIndex("build_weapons_build_id_index")
    .on("build_weapons")
    .execute();
  await db.schema
    .dropIndex("build_weapons_weapon_id_index")
    .on("build_weapons")
    .execute();
  await db.schema
    .dropIndex("build_artifacts_build_id_index")
    .on("build_artifacts")
    .execute();
  await db.schema
    .dropIndex("build_artifact_sets_build_artifact_id_index")
    .on("build_artifact_sets")
    .execute();
  await db.schema
    .dropIndex("build_artifact_sets_artifact_set_id_index")
    .on("build_artifact_sets")
    .execute();
}
