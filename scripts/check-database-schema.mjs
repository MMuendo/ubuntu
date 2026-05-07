import pg from "pg";

import { postgresTables } from "../lib/db/tables.js";
import { getDatabaseUrl } from "./_env.mjs";

const { Client } = pg;
const expectedTables = postgresTables.map((item) => item.table);

const connectionString = getDatabaseUrl();
if (!connectionString) {
  console.error("Missing DATABASE_URL. Add the Railway Postgres connection string to .env.local.");
  process.exit(1);
}

const client = new Client({
  connectionString,
  ssl: process.env.POSTGRES_SSL === "false" ? false : { rejectUnauthorized: false }
});

await client.connect();

try {
  const { rows } = await client.query(
    `select table_name
     from information_schema.tables
     where table_schema = 'public'
     and table_name = any($1::text[])
     order by table_name`,
    [expectedTables]
  );

  const found = new Set(rows.map((row) => row.table_name));
  const results = [];
  for (const { table, label, key } of postgresTables) {
    if (!found.has(table)) {
      results.push({ table, label, present: false, count: null });
      continue;
    }

    try {
      const countResult = await client.query(`select count(${key})::int as count from ${table}`);
      results.push({ table, label, present: true, count: countResult.rows[0]?.count ?? 0 });
    } catch (error) {
      results.push({ table, label, present: true, count: null, error: error.message });
    }
  }

  console.log(JSON.stringify({ ok: results.every((result) => result.present), results }, null, 2));
} finally {
  await client.end();
}
