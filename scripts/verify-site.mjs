import { access, readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const requiredFiles = [
  "index.html",
  "netlify.toml",
  "public/favicon.svg",
  "public/images/sohazur-islam.jpg",
  "public/projects/c2c.png",
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
const netlifyConfig = await readFile(resolve(root, "netlify.toml"), "utf8");
const interfaceSource = await readFile(
  resolve(root, "src/components/Interface.jsx"),
  "utf8"
);
const projectsSource = await readFile(
  resolve(root, "src/components/Projects.jsx"),
  "utf8"
);

const requiredHtml = [
  "<title>Sohazur Islam — Entrepreneur &amp; Founder of ReachLLM</title>",
  '<link rel="canonical" href="https://sohazur.com/"',
  'name="google-site-verification"',
  'content="xfSSKT6l3ScAggaMdsJffKTlYXYWCO8OW19K0qCWeE4"',
  'property="og:image" content="https://sohazur.com/images/sohazur-islam.jpg"',
  '"@type": "ProfilePage"',
  '"@type": "Person"',
  '"@id": "https://sohazur.com/#person"',
  '"https://www.linkedin.com/in/sohazur/"',
  '"https://github.com/sohazur"',
  '"https://www.reachllm.com/"',
  '"https://carbon2capital.com/"',
  "previously co-founded Carbon2Capital",
  '<form name="contact" netlify netlify-honeypot="bot-field" hidden>',
  '<input type="hidden" name="form-name" value="contact" />',
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

const profilePage = graph["@graph"].find(
  (node) => node["@type"] === "ProfilePage"
);
const isoDateTimeWithTimezone =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
if (
  !profilePage ||
  !isoDateTimeWithTimezone.test(profilePage.dateModified) ||
  Number.isNaN(Date.parse(profilePage.dateModified))
) {
  throw new Error(
    "ProfilePage dateModified must be a valid ISO 8601 datetime with timezone"
  );
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
if (!interfaceSource.includes('body: new URLSearchParams(new FormData(form)).toString()')) {
  throw new Error("React contact form is not posting URL-encoded form data");
}
if (!projectsSource.includes("Carbon2Capital")) {
  throw new Error("Carbon2Capital is missing from the project carousel");
}
for (const [label, source] of [
  ["HTML identity graph", html],
  ["visible interface", interfaceSource],
  ["project carousel", projectsSource],
]) {
  if (/Foyer|tryfoyer/i.test(source)) {
    throw new Error(`Removed Foyer identity claim is still present in ${label}`);
  }
}
if (netlifyConfig.includes('to = "https://sohazur.com/:splat"')) {
  throw new Error("A hostname redirect is still configured");
}

console.log(`Verified ${requiredFiles.length} identity, metadata, and crawl files.`);
