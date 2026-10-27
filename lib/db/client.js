import pg from "pg";

import { getDatabaseUrl, hasDatabaseEnv } from "./config";

const { Pool } = pg;

let pool;

export function getPool() {
  if (!hasDatabaseEnv()) return null;

  if (!pool) {
    pool = new Pool({
      connectionString: getDatabaseUrl(),
      ssl: process.env.POSTGRES_SSL === "false" ? false : { rejectUnauthorized: false },
      connectionTimeoutMillis: 4000,
      idleTimeoutMillis: 10000
    });
  }

  return pool;
}

export async function isDatabaseReady() {
  if (!hasDatabaseEnv()) return false;
  try {
    const { rows } = await query(`select
      to_regclass('public.profiles') is not null as profiles,
      to_regclass('public.leads') is not null as leads,
      to_regclass('public.consultations') is not null as consultations,
      to_regclass('public.mentorship_applications') is not null as mentorship_applications`);
    return Object.values(rows[0] || {}).every(Boolean);
  } catch {
    return false;
  }
}

export async function query(text, params = []) {
  const db = getPool();
  if (!db) {
    throw new Error("Database environment variables are not configured.");
  }

  return db.query(text, params);
}

export async function transaction(callback) {
  const db = getPool();
  if (!db) {
    throw new Error("Database environment variables are not configured.");
  }

  const client = await db.connect();
  try {
    await client.query("begin");
    const result = await callback(client);
    await client.query("commit");
    return result;
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
  }
}
