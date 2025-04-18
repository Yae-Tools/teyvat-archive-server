import { createClient } from "@supabase/supabase-js";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { IDatabase } from "../types/database.types";

const SUPABASE_URL = process.env.SUPABASE_URL ?? "";
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE ?? "";

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

// Kysely client using the same connection details
const pool = new Pool({
  connectionString: SUPABASE_URL
});

export const db = new Kysely<IDatabase>({
  dialect: new PostgresDialect({
    pool
  })
});
