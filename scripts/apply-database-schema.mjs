import fs from "node:fs";
import pg from "pg";

import { getDatabaseUrl } from "./_env.mjs";

const { Client } = pg;
const sqlFiles = ["database/schema.sql", "database/seed.sql"];

const connectionString = getDatabaseUrl();
if (!connectionString) {
  console.error("Missing DATABASE_URL. Add the Railway Postgres connection string to .env.local.");
  process.exit(1);
}

for (const file of sqlFiles) {
  if (!fs.existsSync(file)) {
    console.error(`Missing SQL file: ${file}`);
    process.exit(1);
  }
}

const client = new Client({
  connectionString,
  ssl: process.env.POSTGRES_SSL === "false" ? false : { rejectUnauthorized: false }
});

await client.connect();

try {
  for (const file of sqlFiles) {
    console.log(`Applying ${file}...`);
    await client.query(fs.readFileSync(file, "utf8"));
  }

  const { rows } = await client.query(
    `select table_name
     from information_schema.tables
     where table_schema = 'public'
     order by table_name`
  );

  console.log(JSON.stringify({ ok: true, tables: rows.map((row) => row.table_name) }, null, 2));
} finally {
  await client.end();
}
