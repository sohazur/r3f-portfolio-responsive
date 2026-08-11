import { access, readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const requiredFiles = [
  "index.html",
  "netlify.toml",
  "public/favicon.svg",
  "public/images/sohazur-islam.jpg",
  "public/projects/foyer.svg",
  "public/projects/reachllm.webp",
  "public/robots.txt",
  "public/site.webmanifest",
  "public/sitemap.xml",
];

await Promise.all(requiredFiles.map((file) => access(resolve(root, file))));

const html = await readFile(resolve(root, "index.html"), "utf8");
const sitemap = await readFile(resolve(root, "public/sitemap.xml"), "utf8");
const robots = await readFile(resolve(root, "public/robots.txt"), "utf8");
const portrait = await stat(resolve(root, "public/images/sohazur-islam.jpg"));

const requiredHtml = [
  "<title>Sohazur Islam — Entrepreneur &amp; Founder of ReachLLM</title>",
  '<link rel="canonical" href="https://sohazur.com/"',
  'property="og:image" content="https://sohazur.com/images/sohazur-islam.jpg"',
  '"@type": "ProfilePage"',
  '"@type": "Person"',
  '"@id": "https://sohazur.com/#person"',
  '"https://www.linkedin.com/in/sohazur/"',
  '"https://github.com/sohazur"',
  '"https://www.reachllm.com/"',
  '"https://tryfoyer.ai/"',
];

for (const fragment of requiredHtml) {
  if (!html.includes(fragment)) {
    throw new Error(`Missing required HTML fragment: ${fragment}`);
  }
}

const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (!jsonLdMatch) throw new Error("JSON-LD graph is missing");
const graph = JSON.parse(jsonLdMatch[1]);
if (!Array.isArray(graph["@graph"]) || graph["@graph"].length < 5) {
  throw new Error("JSON-LD graph is incomplete");
}

if (!sitemap.includes("https://sohazur.com/images/sohazur-islam.jpg")) {
  throw new Error("Portrait is missing from the image sitemap");
}
if (!robots.includes("Sitemap: https://sohazur.com/sitemap.xml")) {
  throw new Error("robots.txt does not reference the canonical sitemap");
}
if (portrait.size < 100_000) {
  throw new Error("Representative portrait appears unexpectedly small");
}

console.log(`Verified ${requiredFiles.length} identity, metadata, and crawl files.`);
