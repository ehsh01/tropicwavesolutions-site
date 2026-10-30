import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const palettePath = resolve(import.meta.dirname, "..", "src", "palettes.css");
const source = await readFile(palettePath, "utf8");

const requiredTokens = [
  "page",
  "surface",
  "header",
  "strong",
  "strong-raised",
  "on-strong",
  "on-strong-muted",
  "on-strong-accent",
  "heading",
  "body",
  "primary",
  "primary-hover",
  "soft",
  "pill",
  "pill-text",
  "accent",
  "accent-hover",
  "accent-strong",
  "on-accent",
  "border",
  "focus",
  "selection",
  "decorative-panel",
  "glow",
  "grid",
  "shadow",
];

const requiredPairs = [
  ["heading", "page"],
  ["body", "page"],
  ["heading", "surface"],
  ["body", "surface"],
  ["heading", "header"],
  ["body", "header"],
  ["heading", "soft"],
  ["body", "soft"],
  ["primary", "page"],
  ["primary", "surface"],
  ["primary", "header"],
  ["primary", "soft"],
  ["on-strong", "strong"],
  ["on-strong-muted", "strong"],
  ["on-strong-accent", "strong"],
  ["on-strong", "strong-raised"],
  ["on-strong-muted", "strong-raised"],
  ["on-strong-accent", "strong-raised"],
  ["pill-text", "pill"],
  ["accent-strong", "page"],
  ["accent-strong", "surface"],
  ["accent-strong", "soft"],
  ["heading", "selection"],
  ["on-accent", "accent"],
  ["on-accent", "accent-hover"],
  ["surface", "primary-hover"],
];

function parsePalettes(css) {
  const palettes = new Map();
  const blockPattern = /\.palette-([abc])\s*\{([^}]*)\}/g;

  for (const match of css.matchAll(blockPattern)) {
    const tokens = new Map();
    const declarationPattern = /--color-([\w-]+)\s*:\s*(#[\da-f]{6}(?:[\da-f]{2})?)\s*;/gi;

    for (const declaration of match[2].matchAll(declarationPattern)) {
      tokens.set(declaration[1], declaration[2]);
    }

    palettes.set(`palette-${match[1]}`, tokens);
  }

  return palettes;
}

function relativeLuminance(hex) {
  const channels = hex
    .slice(1, 7)
    .match(/.{2}/g)
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) =>
      channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4,
    );

  return (
    0.2126 * channels[0] +
    0.7152 * channels[1] +
    0.0722 * channels[2]
  );
}

function contrastRatio(foreground, background) {
  const foregroundLuminance = relativeLuminance(foreground);
  const backgroundLuminance = relativeLuminance(background);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

const palettes = parsePalettes(source);
const failures = [];

for (const paletteName of ["palette-a", "palette-b", "palette-c"]) {
  const tokens = palettes.get(paletteName);

  if (!tokens) {
    failures.push(`${paletteName}: class is missing`);
    continue;
  }

  for (const token of requiredTokens) {
    if (!tokens.has(token)) {
      failures.push(`${paletteName}: --color-${token} is missing`);
    }
  }

  let lowestRatio = Number.POSITIVE_INFINITY;
  let lowestPair = "";

  for (const [foregroundName, backgroundName] of requiredPairs) {
    const foreground = tokens.get(foregroundName);
    const background = tokens.get(backgroundName);

    if (!foreground || !background) continue;

    const ratio = contrastRatio(foreground, background);
    if (ratio < lowestRatio) {
      lowestRatio = ratio;
      lowestPair = `${foregroundName}/${backgroundName}`;
    }

    if (ratio < 4.5) {
      failures.push(
        `${paletteName}: ${foregroundName} ${foreground} on ${backgroundName} ${background} is ${ratio.toFixed(2)}:1`,
      );
    }
  }

  if (Number.isFinite(lowestRatio)) {
    console.log(
      `${paletteName}: ${requiredTokens.length} tokens; lowest required contrast ${lowestRatio.toFixed(2)}:1 (${lowestPair})`,
    );
  }
}

if (failures.length > 0) {
  console.error("\nPalette validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("All palette token contracts and normal-text contrast pairs pass.");
}
