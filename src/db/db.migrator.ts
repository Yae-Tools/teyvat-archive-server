// migrator.ts
import {
  FileMigrationProvider,
  Kysely,
  Migrator,
  PostgresDialect
} from "kysely";
import { Pool } from "pg";
import * as path from "path";
import * as fs from "fs/promises";

import type { IDatabase } from "../types/database.types";
// Create database connection
const db = new Kysely<IDatabase>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.SUPABASE_CONNECTION_STRING,
      ssl: { rejectUnauthorized: false }
    })
  })
});

const MIGRATION_FOLDER = path.join(__dirname, "../migrations");

// Create migrator
const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder: MIGRATION_FOLDER
  })
});

// Export migration function
export async function migrateToLatest() {
  console.log("Running database migrations...");

  const { error, results } = await migrator.migrateToLatest();

  if (error) {
    console.error("Migration failed:", error);
    throw error; // Propagate the error to be handled by the caller
  }

  if (results && results.length > 0) {
    results.forEach((migration) => {
      console.log(
        `Migration "${migration.migrationName}" was executed successfully`
      );
    });
  } else {
    console.log("No migrations were executed. Database schema is up to date.");
  }

  return { db }; // Return the database instance if needed elsewhere
}
