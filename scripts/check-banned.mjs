import { readFile, readdir, stat } from "node:fs/promises";
import { extname, resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const requestedRoot = process.argv[2];
const targets = requestedRoot
  ? [requestedRoot]
  : ["src", "public", ".github", "index.html", "README.md"];

const banned = [
  "tropical" + "wave",
  "tropical" + " wave",
  "tropical" + "wavesolutions.com",
  "re" + "plit",
  "travel" + "crew",
  "affil" + "iate",
  "e-" + "commerce",
  "(786) " + "440-8282",
  "786" + "-440-8282",
  "786" + "4408282",
];

const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".md",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
  ".xml",
  ".yml",
  ".yaml",
]);

async function collect(path) {
  const absolute = resolve(projectRoot, path);
  const details = await stat(absolute);
  if (details.isFile()) return [absolute];

  const entries = await readdir(absolute, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => collect(`${path}/${entry.name}`)),
  );
  return nested.flat();
}

const files = (await Promise.all(targets.map(collect)))
  .flat()
  .filter((file) => textExtensions.has(extname(file).toLowerCase()));

const failures = [];
for (const file of files) {
  const content = (await readFile(file, "utf8")).toLowerCase();
  for (const phrase of banned) {
    if (content.includes(phrase)) {
      failures.push(`${file.slice(projectRoot.length + 1)}: ${phrase}`);
    }
  }
}

if (failures.length > 0) {
  console.error("Blocked legacy references found:\n" + failures.join("\n"));
  process.exit(1);
}

console.log(`Legacy-reference check passed (${files.length} files scanned).`);
