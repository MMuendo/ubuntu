import assert from "node:assert/strict";
import { siteUrl } from "../lib/seo.js";

const base = process.env.SEO_TEST_URL || "http://127.0.0.1:4174";
const paths = ["/", "/mentorships", "/mentorships/groups", "/academy", "/blogs", "/for-organizations", "/for-organizations/engineering", "/for-organizations/advisory", "/for-organizations/solution-patterns"];
const titles = new Set();
const descriptions = new Set();

for (const path of paths) {
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, 200, path);
  const html = await response.text();
  const canonical = `${siteUrl}${path === "/" ? "" : path}`;
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, `${path}: one canonical`);
  assert.ok(html.includes(`rel="canonical" href="${canonical}"`), `${path}: correct canonical`);
  assert.ok(html.includes(`property="og:url" content="${canonical}"`), `${path}: sharing URL`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const description = html.match(/name="description" content="([^"]+)"/)?.[1];
  assert.ok(title && description, `${path}: title and description`);
  assert.equal((title.match(/Ubuntu Analytiq/g) || []).length, 1, `${path}: one brand suffix`);
  assert.ok(!titles.has(title), `${path}: unique title`);
  assert.ok(!descriptions.has(description), `${path}: unique description`);
  titles.add(title);
  descriptions.add(description);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${path}: one main heading`);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(match => JSON.parse(match[1]));
  assert.ok(schemas.some(item => item["@type"] === "Organization" && item.address?.addressLocality === "Nairobi"), `${path}: organization location`);
  if (path.endsWith("/engineering")) {
    assert.equal(schemas.filter(item => item["@type"] === "Service").length, 4);
    for (const term of ["Databricks", "PySpark", "dbt", "AWS DMS", "Retrieval-augmented generation", "Microsoft Foundry"]) assert.ok(html.includes(term), `Missing ${term}`);
  }
  if (path === "/mentorships") assert.ok(schemas.some(item => item["@type"] === "Service"));
  console.log(`PASS metadata, heading and schema: ${path}`);
}

const robots = await (await fetch(`${base}/robots.txt`)).text();
const rules = [...robots.matchAll(/^Disallow: (.+)$/gm)].map(match => match[1].trim());
const blocked = path => rules.some(rule => rule.endsWith("$") ? path === rule.slice(0, -1) : path.startsWith(rule));
assert.equal(blocked("/mentorships"), false, "Public mentorship must be crawlable");
for (const path of ["/mentors", "/mentors/propose", "/mentorships/workspace"]) assert.equal(blocked(path), true, path);
for (const path of ["/login", "/signup", "/mentorships/apply"]) {
  assert.equal(blocked(path), false, `${path}: allow crawler to read noindex`);
  const html = await (await fetch(`${base}${path}`)).text();
  assert.ok(html.includes('name="robots" content="noindex'), `${path}: noindex`);
}
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
for (const path of paths.filter(path => path !== "/")) assert.ok(sitemap.includes(`${siteUrl}${path}</loc>`), `Sitemap: ${path}`);
for (const url of [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1])) {
  const path = new URL(url).pathname;
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, 200, `Sitemap route: ${path}`);
  const html = await response.text();
  assert.ok(html.includes(`rel="canonical" href="${url}"`), `${path}: self-canonical`);
  assert.ok(html.includes(`property="og:url" content="${url}"`), `${path}: own sharing URL`);
}
console.log("PASS mentorship crawl rules and core sitemap URLs");
