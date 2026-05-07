import pg from "pg";

import { hashPassword } from "../lib/auth/password.js";
import { getDatabaseUrl, loadDotEnv } from "./_env.mjs";

const { Client } = pg;

const env = { ...loadDotEnv(), ...process.env };
const connectionString = getDatabaseUrl();
const email = String(env.ADMIN_EMAIL || "").trim().toLowerCase();
const password = String(env.ADMIN_PASSWORD || "");
const fullName = String(env.ADMIN_NAME || "Ubuntu Academy Admin").trim();

if (!connectionString) {
  console.error("Missing DATABASE_URL. Add the Railway Postgres connection string to .env.local.");
  process.exit(1);
}

if (!email || !password) {
  console.error("Missing ADMIN_EMAIL or ADMIN_PASSWORD. Set them temporarily before running npm run db:create-admin.");
  process.exit(1);
}

if (password.length < 8) {
  console.error("ADMIN_PASSWORD must be at least 8 characters.");
  process.exit(1);
}

const client = new Client({
  connectionString,
  ssl: process.env.POSTGRES_SSL === "false" ? false : { rejectUnauthorized: false }
});

await client.connect();

try {
  await client.query("begin");
  const passwordHash = await hashPassword(password);
  const { rows } = await client.query(
    `insert into profiles (full_name, email, password_hash, default_role)
     values ($1, $2, $3, 'admin')
     on conflict (email) do update set
       full_name = excluded.full_name,
       password_hash = excluded.password_hash,
       default_role = 'admin',
       updated_at = now()
     returning id, email`,
    [fullName, email, passwordHash]
  );

  await client.query(
    `insert into role_memberships (user_id, role, status)
     values ($1, 'admin', 'active')
     on conflict (user_id, role) where organization_id is null
     do update set status = 'active'`,
    [rows[0].id]
  );

  await client.query("commit");
  console.log(JSON.stringify({ ok: true, email: rows[0].email, role: "admin" }, null, 2));
} catch (error) {
  await client.query("rollback");
  throw error;
} finally {
  await client.end();
}
