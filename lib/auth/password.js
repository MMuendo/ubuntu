import crypto from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(crypto.scrypt);
const keyLength = 64;

export async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = await scrypt(password, salt, keyLength);
  return `scrypt:${salt}:${derivedKey.toString("hex")}`;
}

export async function verifyPassword(password, storedHash) {
  const [algorithm, salt, hash] = String(storedHash || "").split(":");
  if (algorithm !== "scrypt" || !salt || !hash) return false;

  const derivedKey = await scrypt(password, salt, keyLength);
  const storedKey = Buffer.from(hash, "hex");
  if (storedKey.length !== derivedKey.length) return false;

  return crypto.timingSafeEqual(storedKey, derivedKey);
}
