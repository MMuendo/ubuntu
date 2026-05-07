import pg from "pg";

import { getDatabaseUrl, hasDatabaseEnv } from "./config";

const { Pool } = pg;

let pool;

export function getPool() {
  if (!hasDatabaseEnv()) return null;

  if (!pool) {
    pool = new Pool({
      connectionString: getDatabaseUrl(),
      ssl: process.env.POSTGRES_SSL === "false" ? false : { rejectUnauthorized: false }
    });
  }

  return pool;
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
