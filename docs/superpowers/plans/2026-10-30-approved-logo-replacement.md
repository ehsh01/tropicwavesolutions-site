# Approved Logo Replacement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace every old Tropic Wave Solutions logo with Ernesto's approved palm-and-wave “TW” artwork and ship a complete, committed static icon and social-image set.

**Architecture:** Store the approved transparent PNG as the canonical source and extend the existing Sharp-based social-image generator to produce deterministic static derivatives under `public/`. Reference optimized WebP files in page chrome and the hero, and reference the favicon/PNG outputs from HTML metadata.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, Node.js, Sharp

## Global Constraints

- Preserve existing layout, displayed heights, and loading behavior.
- Preserve the source logo's approximately 1.38:1 aspect ratio and transparency.
- Commit all generated assets for direct GitHub Pages serving.
- Keep the existing `prebuild` generation hook; do not add a new deployment prerequisite.
- Do not add a splash or loader.
- Leave the pull request open and unmerged.

---

### Task 1: Reproducible brand assets

**Files:**
- Create: `assets/tw-logo-transparent.png`
- Modify: `scripts/generate-social-image.mjs`
- Create: `public/tw-logo.png`
- Create: `public/tw-logo-header.webp`
- Create: `public/tw-logo-hero.webp`
- Create: `public/favicon-16x16.png`
- Create: `public/favicon-32x32.png`
- Create: `public/favicon.ico`
- Create: `public/apple-touch-icon.png`
- Modify: `public/social-card.png`
- Delete: `public/logo.svg`
- Delete: `public/favicon.svg`

**Interfaces:**
- Consumes: the approved transparent PNG at `assets/tw-logo-transparent.png`.
- Produces: committed browser-ready assets referenced by Tasks 2 and 3.

- [ ] **Step 1: Add generator assertions**

Make `scripts/generate-social-image.mjs` read the canonical source with Sharp, reject images without alpha, and fail if the aspect ratio differs materially from 1.38:1. Add helpers that create transparent contained images and a standards-compliant ICO containing embedded 16px and 32px PNG frames.

- [ ] **Step 2: Verify the old generator cannot produce the required set**

Run:

```bash
npm run generate:social
test -f public/favicon.ico
```

Expected: the existing generator creates only `public/social-card.png`; the file assertion fails before implementation.

- [ ] **Step 3: Generate every derivative**

Extend the existing script to write:

- `tw-logo.png`: optimized canonical PNG.
- `tw-logo-header.webp`: 132×96 transparent WebP.
- `tw-logo-hero.webp`: 512×370 transparent WebP.
- `favicon-16x16.png` and `favicon-32x32.png`: transparent square canvases with a contained logo.
- `favicon.ico`: 16px and 32px PNG-backed ICO frames.
- `apple-touch-icon.png`: 180×180 transparent canvas with a contained logo.
- `social-card.png`: 1200×630 off-white (`#fafaf9`) canvas with a centered logo.

Remove the obsolete SVG files after generation.

- [ ] **Step 4: Verify generated metadata**

Run a Node/Sharp assertion that checks exact output dimensions, confirms alpha on every transparent format Sharp can inspect, confirms the ICO header contains two frames, and confirms the social card is 1200×630.

Expected: all assertions pass.

- [ ] **Step 5: Commit**

```bash
git add assets scripts/generate-social-image.mjs public
git commit -m "feat: generate approved logo asset set"
```

### Task 2: Replace every old logo reference

**Files:**
- Modify: `src/App.tsx`
- Modify: `index.html`

**Interfaces:**
- Consumes: the generated assets from Task 1.
- Produces: header, footer, hero, favicon, social metadata, and structured-data references with no old SVG paths.

- [ ] **Step 1: Capture a failing stale-reference check**

Run:

```bash
rg 'logo\.svg|favicon\.svg' src index.html public scripts
```

Expected: matches in `src/App.tsx` and `index.html`.

- [ ] **Step 2: Update page logo placements**

Change header and footer images to `/tw-logo-header.webp`, preserving `h-11` and `h-12` respectively and changing fixed square widths to `w-auto`. Change the hero image to `/tw-logo-hero.webp` with `object-contain`, preserving its existing positioned area and surrounding visual structure.

- [ ] **Step 3: Update browser and social metadata**

In `index.html`, add ICO, 32px, 16px, and Apple touch icon links. Keep social-card references at `/social-card.png` and change the organization JSON-LD logo URL to `/tw-logo.png`.

- [ ] **Step 4: Verify stale references are gone**

Run:

```bash
if rg 'logo\.svg|favicon\.svg' src index.html public scripts; then exit 1; fi
```

Expected: exit 0 with no matches.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx index.html
git commit -m "feat: use approved logo across site"
```

### Task 3: Validate and collect visual evidence

**Files:**
- Verify: all changed files
- Create artifacts outside the repository under `/opt/cursor/artifacts/`

**Interfaces:**
- Consumes: the production build from Tasks 1 and 2.
- Produces: fresh automated validation and screenshots for the PR.

- [ ] **Step 1: Check environment setup**

Inspect `/tmp/cursor/async-install/install-user.status` when present and continue only after the existing setup succeeds.

- [ ] **Step 2: Run full validation**

Run:

```bash
npm run validate
```

Expected: typecheck, lint, production build, generated route pages, and banned-content checks all exit 0.

- [ ] **Step 3: Serve the production build**

Start `npm run preview -- --host 0.0.0.0` in a persistent tmux session.

- [ ] **Step 4: Capture required screenshots**

At desktop and mobile viewport widths, capture screenshots showing the header and footer. Also capture the hero and a browser-tab/favicon view. Do not capture or add a loader screenshot because loading behavior is intentionally unchanged and no loader exists.

- [ ] **Step 5: Verify the final diff**

Run:

```bash
git diff --check main...HEAD
git status --short
```

Expected: no whitespace errors and only intentional changes.

### Task 4: Publish the review branch

**Files:**
- Update: PR description only

**Interfaces:**
- Consumes: committed code and screenshots from Tasks 1–3.
- Produces: an open, unmerged pull request against `main`.

- [ ] **Step 1: Commit any final verified changes**

Stage and commit only intentional files using a descriptive commit message.

- [ ] **Step 2: Push the branch**

```bash
git push -u origin cursor/replace-approved-logo-a1af
```

- [ ] **Step 3: Open the pull request**

Create a ready-for-review PR against `main` with a concise summary, validation results, and embedded desktop/mobile/favicon screenshots. Do not merge it.
