import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

const projectRoot = resolve(import.meta.dirname, "..");
const outputDir = resolve(projectRoot, "public");
const sourcePath = resolve(projectRoot, "assets", "tw-logo-transparent.png");
await mkdir(outputDir, { recursive: true });

const source = await sharp(sourcePath).png().toBuffer();
const metadata = await sharp(source).metadata();
const expectedAspectRatio = 1.38;
const aspectRatioTolerance = 0.02;

if (!metadata.hasAlpha) {
  throw new Error("Canonical logo must have an alpha channel.");
}

const aspectRatio = metadata.width / metadata.height;
if (Math.abs(aspectRatio - expectedAspectRatio) > aspectRatioTolerance) {
  throw new Error(
    `Canonical logo aspect ratio must be approximately ${expectedAspectRatio}:1; received ${aspectRatio.toFixed(3)}:1.`,
  );
}

function transparentContained(width, height) {
  return sharp(source)
    .resize(width, height, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .ensureAlpha();
}

function createIco(images) {
  const directorySize = 6 + images.length * 16;
  const header = Buffer.alloc(directorySize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  let offset = directorySize;
  images.forEach(({ size, data }, index) => {
    const entry = 6 + index * 16;
    header.writeUInt8(size === 256 ? 0 : size, entry);
    header.writeUInt8(size === 256 ? 0 : size, entry + 1);
    header.writeUInt8(0, entry + 2);
    header.writeUInt8(0, entry + 3);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(data.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });

  return Buffer.concat([header, ...images.map(({ data }) => data)]);
}

const favicon16 = await transparentContained(16, 16)
  .png({ compressionLevel: 9 })
  .toBuffer();
const favicon32 = await transparentContained(32, 32)
  .png({ compressionLevel: 9 })
  .toBuffer();
const socialLogo = await transparentContained(720, 520)
  .png({ compressionLevel: 9 })
  .toBuffer();

await Promise.all([
  sharp(source)
    .png({ compressionLevel: 9 })
    .toFile(resolve(outputDir, "tw-logo.png")),
  transparentContained(132, 96)
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(resolve(outputDir, "tw-logo-header.webp")),
  transparentContained(512, 370)
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(resolve(outputDir, "tw-logo-hero.webp")),
  writeFile(resolve(outputDir, "favicon-16x16.png"), favicon16),
  writeFile(resolve(outputDir, "favicon-32x32.png"), favicon32),
  writeFile(
    resolve(outputDir, "favicon.ico"),
    createIco([
      { size: 16, data: favicon16 },
      { size: 32, data: favicon32 },
    ]),
  ),
  transparentContained(180, 180)
    .png({ compressionLevel: 9 })
    .toFile(resolve(outputDir, "apple-touch-icon.png")),
  sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 3,
      background: "#fafaf9",
    },
  })
    .composite([{ input: socialLogo, gravity: "centre" }])
    .removeAlpha()
    .png({ compressionLevel: 9 })
    .toFile(resolve(outputDir, "social-card.png")),
]);

console.log("Generated approved logo asset set in public/.");
