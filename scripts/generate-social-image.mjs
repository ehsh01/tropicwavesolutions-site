import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

const projectRoot = resolve(import.meta.dirname, "..");
const outputDir = resolve(projectRoot, "public");
await mkdir(outputDir, { recursive: true });

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#042f2e"/>
      <stop offset="1" stop-color="#07505a"/>
    </linearGradient>
    <linearGradient id="wave" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#27b5a8"/>
      <stop offset="1" stop-color="#0f8b8d"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#background)"/>
  <circle cx="1045" cy="112" r="210" fill="#f58b70" opacity=".13"/>
  <circle cx="1082" cy="72" r="66" fill="#ffb393"/>
  <path d="M0 487c154-111 297-111 430-5 146 116 298 118 506-15 102-65 190-69 264-34v197H0z" fill="url(#wave)" opacity=".72"/>
  <path d="M0 548c147-76 281-66 407 19 143 97 310 76 492-35 110-67 210-69 301-25v123H0z" fill="#66d4c4" opacity=".42"/>
  <g transform="translate(78 75)">
    <rect width="126" height="126" rx="31" fill="#f2fbf9"/>
    <circle cx="93" cy="34" r="14" fill="#f4715b"/>
    <path d="M20 39h76v15H66v42H50V54H20z" fill="#063f47"/>
    <path d="M16 87c19-22 38-23 56-4 15 14 29 14 51-5-13 33-43 42-67 23-14-12-25-11-40 0z" fill="#0f8b8d"/>
  </g>
  <text x="78" y="282" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="700" letter-spacing="-2">Tropic Wave Solutions LLC</text>
  <text x="82" y="351" fill="#b9eee5" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="500">Software design and development</text>
  <rect x="82" y="395" width="102" height="7" rx="3.5" fill="#ffb393"/>
</svg>`;

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9, palette: true })
  .toFile(resolve(outputDir, "social-card.png"));

console.log("Generated public/social-card.png (1200x630).");
