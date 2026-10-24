import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const distDir = resolve(projectRoot, "dist");
const siteData = JSON.parse(
  await readFile(resolve(projectRoot, "src/site-data.json"), "utf8"),
);
const baseHtml = await readFile(resolve(distDir, "index.html"), "utf8");
const siteUrl = "https://tropicwavesolutions.com";

const routeDetails = {
  "/about": { heading: "About Tropic Wave Solutions LLC" },
  "/services": { heading: "Software services and products" },
  "/contact": { heading: "Contact Tropic Wave Solutions LLC" },
  "/privacy": {
    heading: "Privacy Policy",
    legalFile: "privacy.html",
  },
  "/terms": {
    heading: "Terms of Service",
    legalFile: "terms.html",
  },
  "/data-deletion": {
    heading: "Data Deletion Instructions",
    legalFile: "data-deletion.html",
  },
};

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function replaceMeta(html, attribute, key, value) {
  const pattern = new RegExp(
    `(<meta\\s+[^>]*${attribute}="${escapeRegExp(key)}"[^>]*content=")[^"]*("[^>]*>)`,
    "i",
  );
  const updated = html.replace(pattern, `$1${escapeHtml(value)}$2`);
  if (updated === html) {
    throw new Error(`Could not find ${attribute}="${key}" in built index.html`);
  }
  return updated;
}

function replaceLink(html, rel, href) {
  const pattern = new RegExp(
    `(<link\\s+[^>]*rel="${escapeRegExp(rel)}"[^>]*href=")[^"]*("[^>]*>)`,
    "i",
  );
  const updated = html.replace(pattern, `$1${escapeHtml(href)}$2`);
  if (updated === html) {
    throw new Error(`Could not find rel="${rel}" in built index.html`);
  }
  return updated;
}

async function createRoutePage(route, details) {
  const meta = siteData.routes[route];
  const canonical = `${siteUrl}${route}`;
  let html = baseHtml.replace(
    /<title>.*?<\/title>/i,
    `<title>${escapeHtml(meta.title)}</title>`,
  );

  html = replaceMeta(html, "name", "description", meta.description);
  html = replaceMeta(html, "property", "og:title", meta.title);
  html = replaceMeta(html, "property", "og:description", meta.description);
  html = replaceMeta(html, "property", "og:url", canonical);
  html = replaceMeta(html, "name", "twitter:title", meta.title);
  html = replaceMeta(html, "name", "twitter:description", meta.description);
  html = replaceLink(html, "canonical", canonical);

  const legalContent = details.legalFile
    ? await readFile(
        resolve(projectRoot, "src/legal", details.legalFile),
        "utf8",
      )
    : "";
  const staticMarkup = legalContent
    ? `<main class="section"><article class="legal shell"><h1>${escapeHtml(details.heading)}</h1><p><strong>Last updated: ${escapeHtml(siteData.lastUpdated.display)}</strong></p>${legalContent}</article></main>`
    : `<main class="section"><div class="shell"><h1>${escapeHtml(details.heading)}</h1><p>${escapeHtml(meta.description)}</p></div></main>`;
  const noscript = `<noscript><p>${escapeHtml(details.heading)} is available on this page without JavaScript. For help, email support@tropicwavesolutions.com.</p></noscript>`;
  const rootMarker = '<div id="root"></div>';
  if (!html.includes(rootMarker)) {
    throw new Error("Could not find root marker in built index.html");
  }
  html = html.replace(
    rootMarker,
    `<div id="root">${staticMarkup}</div>\n    ${noscript}`,
  );

  const outputDir = resolve(distDir, route.slice(1));
  await mkdir(outputDir, { recursive: true });
  await writeFile(resolve(outputDir, "index.html"), html);
}

for (const [route, details] of Object.entries(routeDetails)) {
  await createRoutePage(route, details);
}

const sitemapEntries = Object.keys(siteData.routes)
  .map((route) => {
    const url = route === "/" ? `${siteUrl}/` : `${siteUrl}${route}`;
    return `  <url><loc>${url}</loc><lastmod>${siteData.lastUpdated.iso}</lastmod></url>`;
  })
  .join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`;
await writeFile(resolve(distDir, "sitemap.xml"), sitemap);

console.log(
  `Generated ${Object.keys(routeDetails).length} route pages and sitemap.xml.`,
);
