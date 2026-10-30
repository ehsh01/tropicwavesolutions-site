# Brand Palette Mockups Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add three ranked, WCAG AA, semantic color token sets that make the approved TW logo stand out and can be selected through one active-palette constant.

**Architecture:** Define all palette values in a focused CSS module, replace runtime teal/coral values with semantic custom properties, and apply one palette class from a single `ACTIVE_PALETTE` constant. Add a dependency-free contrast checker that parses the CSS token sets, plus a durable report with labels, hex codes, rationale, and measured ratios.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS 4, Node.js

## Global Constraints

- Default to Option C, then rank Option B, then Option A by strongest overall logo contrast.
- Preserve layout, sizing, typography, content, animation, and all approved logo assets.
- Keep `.palette-a`, `.palette-b`, and `.palette-c` in the branch.
- Use one `ACTIVE_PALETTE` constant in `src/App.tsx`; do not add a switcher, query parameter, storage, or runtime preference.
- Remove all runtime teal/green and coral color references in favor of semantic tokens.
- Every normal text/background pair must meet WCAG AA (4.5:1); large decorative text must not be used to excuse a lower ratio.
- Capture nine labeled screenshots: desktop hero, mobile footer with sticky header, and desktop footer for C, B, and A.
- Open a draft pull request against `main`, defaulting to C, and do not merge it.

---

### Task 1: Semantic palette system and contrast validation

**Files:**
- Create: `src/palettes.css`
- Modify: `src/styles.css`
- Modify: `src/App.tsx`
- Create: `scripts/check-palette-contrast.mjs`
- Modify: `package.json`
- Create: `docs/brand-palette-options.md`

**Interfaces:**
- Produces `.palette-a`, `.palette-b`, and `.palette-c`, each implementing the same semantic CSS property names.
- Produces `ACTIVE_PALETTE: "palette-a" | "palette-b" | "palette-c"`, defaulting to `"palette-c"`.
- Produces `npm run check:palettes`, which exits nonzero if a required token is missing or a declared text/background pair is below 4.5:1.

- [ ] **Step 1: Record the failing legacy-color and missing-check state**

Run:

```bash
rg 'teal-[0-9]+|coral-[0-9]+|#042f2e|#0f766e|#134e4a|#115e59|#ccfbf1|#99f6e4' src/App.tsx src/styles.css
npm run check:palettes
```

Expected: the search returns current legacy color references and npm reports that `check:palettes` does not exist.

- [ ] **Step 2: Define all three semantic token sets**

Create `src/palettes.css` with the shared token contract for page, surface, header, strong background, raised strong surface, on-strong text, muted on-strong text, heading, body, primary, primary-hover, soft surface, pill, pill text, accent, accent-hover, accent-strong, on-accent text, border, focus, selection, decorative panel, glow, grid, and shadow.

Use the exact ranked core colors and rationale from `docs/superpowers/specs/2026-10-30-brand-palette-mockups-design.md`. All three classes must implement every property.

- [ ] **Step 3: Apply semantic tokens without changing structure**

Import `palettes.css` from `styles.css`. Add:

```ts
type Palette = "palette-a" | "palette-b" | "palette-c";
const ACTIVE_PALETTE: Palette = "palette-c";
```

Apply `ACTIVE_PALETTE` to the existing site root. Replace old teal/coral utility classes in `src/App.tsx` with static arbitrary-value utilities backed by semantic properties, and replace hard-coded green/coral CSS values in `src/styles.css` with the same properties. Do not alter component order, copy, dimensions, breakpoints, motion, or logo paths.

- [ ] **Step 4: Add and run the contrast checker**

Create `scripts/check-palette-contrast.mjs` to parse each palette block from `src/palettes.css`, verify the complete token contract, calculate WCAG relative luminance, and assert at least 4.5:1 for each declared normal-text pairing.

Add:

```json
"check:palettes": "node scripts/check-palette-contrast.mjs"
```

Run it from `prebuild` before asset generation so GitHub Pages builds cannot ship a failing token set.

- [ ] **Step 5: Add the ranked palette report**

Create `docs/brand-palette-options.md` with a ranked C/B/A table, the exact core hex values, representative measured ratios, and one sentence per option explaining why the orange and blue logo stands out.

- [ ] **Step 6: Verify the refactor**

Run:

```bash
npm run check:palettes
if rg 'teal-[0-9]+|coral-[0-9]+|#042f2e|#0f766e|#134e4a|#115e59|#ccfbf1|#99f6e4' src/App.tsx src/styles.css; then exit 1; fi
npm run validate
```

Expected: every command exits 0, contrast output reports all three palettes, the stale-color search has no matches, and the production build succeeds.

- [ ] **Step 7: Commit**

```bash
git add src/palettes.css src/styles.css src/App.tsx scripts/check-palette-contrast.mjs package.json docs/brand-palette-options.md
git commit -m "feat: add swappable brand palette mockups"
```

### Task 2: Screenshot all ranked options

**Files:**
- Temporarily modify and restore: `src/App.tsx`
- Create artifacts outside the repository under `/opt/cursor/artifacts/`

**Interfaces:**
- Consumes the three palette classes and single active constant from Task 1.
- Produces nine clearly labeled screenshots while leaving the committed source defaulted to Option C.

- [ ] **Step 1: Serve the local site**

Start the site in a persistent tmux session and verify the browser loads Option C with no palette switcher.

- [ ] **Step 2: Capture Option C**

Capture:

- `palette_c_desktop_hero.png`
- `palette_c_mobile_header_footer.png` at the footer so the sticky header and footer appear together.
- `palette_c_desktop_footer.png`

- [ ] **Step 3: Capture Option B**

Temporarily set `ACTIVE_PALETTE` to `"palette-b"`, allow the local server to update, verify the visible palette label by colors, and capture the same three views with `palette_b_...` names.

- [ ] **Step 4: Capture Option A**

Temporarily set `ACTIVE_PALETTE` to `"palette-a"`, allow the local server to update, and capture the same three views with `palette_a_...` names.

- [ ] **Step 5: Restore and verify Option C**

Restore `ACTIVE_PALETTE` to `"palette-c"` and run:

```bash
npm run check:palettes
npm run validate
git diff --check main...HEAD
git status --short
```

Expected: validation passes, source defaults to C, and the working tree is clean.

### Task 3: Publish the mockups for selection

**Files:**
- Update: draft PR description only

**Interfaces:**
- Consumes committed code, palette report, and nine screenshot artifacts.
- Produces one open, unmerged draft PR against `main`.

- [ ] **Step 1: Push the branch**

```bash
git push -u origin cursor/brand-palette-mockups-a1af
```

- [ ] **Step 2: Open the draft PR**

Create a draft PR against `main`. Rank sections C, B, A; include core hex codes, the one-line logo-contrast rationale, WCAG validation results, and each option's three labeled screenshots. State that changing `ACTIVE_PALETTE` is the only selection change and that the PR is not intended to merge until Ernesto chooses.

- [ ] **Step 3: Confirm delivery state**

Verify the PR is draft, open, based on `main`, includes all nine screenshots, and remains unmerged.
