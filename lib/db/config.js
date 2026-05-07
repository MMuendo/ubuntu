export function getDatabaseUrl() {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL || "";
}

export function hasDatabaseEnv() {
  return Boolean(getDatabaseUrl());
}

export function getSiteUrl() {
  const fallback = "http://localhost:4173";
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || fallback;

  try {
    const url = new URL(rawUrl);
    if (url.hostname === "0.0.0.0") {
      url.hostname = "localhost";
    }
    return url.toString().replace(/\/$/, "");
  } catch {
    return fallback;
  }
}
