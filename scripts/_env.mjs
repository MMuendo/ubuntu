import fs from "node:fs";

export function loadDotEnv(path = ".env.local") {
  const env = {};
  if (!fs.existsSync(path)) return env;

  for (const rawLine of fs.readFileSync(path, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const index = line.indexOf("=");
    const name = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim().replace(/^['"]|['"]$/g, "");
    env[name] = value;
  }

  return env;
}

export function getDatabaseUrl() {
  const env = { ...loadDotEnv(), ...process.env };
  return env.DATABASE_URL || env.POSTGRES_URL || env.POSTGRES_PRISMA_URL || "";
}
