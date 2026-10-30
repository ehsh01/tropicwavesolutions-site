# Brand Palette Mockups Design

## Goal

Provide three WCAG AA palette mockups that replace the site's teal/green brand color, make Ernesto's approved orange-palm/blue-wave TW logo stand out, and can be selected without leaving a runtime theme switcher.

## Ranked options

The options are presented in strongest overall logo contrast order while retaining the requested A/B/C identities.

### 1. Option C — Porcelain Sky

- Hero/footer/page: `#F7FAFC`
- Soft sky surface and active pill: `#DCEEFF`
- Heading and primary text: `#111827`
- Muted text: `#475569`
- Primary link/action: `#0B5F8A`
- Strong orange accent text: `#A83D00`
- Soft orange accent: `#FFB067`

Why the logo stands out: the near-neutral porcelain background shares neither logo hue, so both the orange palm and blue wave retain strong visual separation.

Representative contrast ratios: `#111827` on `#F7FAFC` is 16.92:1; `#475569` on `#F7FAFC` is 7.23:1; `#0B5F8A` on white is 6.96:1.

### 2. Option B — Graphite + Amber

- Hero/footer: `#17191F`
- Raised dark surface: `#262B33`
- Primary light text: `#F9FAFB`
- Muted light text: `#D1D5DB`
- Active pill: `#FFF0E1`
- Active pill text: `#5A2600`
- Strong orange action/text: `#B64700`
- Light orange accent: `#FFB56F`

Why the logo stands out: neutral graphite avoids blue-on-blue competition while creating intense contrast around the orange palm and the wave's lighter highlights.

Representative contrast ratios: `#F9FAFB` on `#17191F` is 16.81:1; `#D1D5DB` on `#17191F` is 11.92:1; `#B64700` on white is 5.40:1.

### 3. Option A — Midnight Ocean

- Hero/footer: `#061827`
- Raised navy surface: `#0B3555`
- Primary light text: `#F5FAFF`
- Muted light text: `#C7DBEA`
- Active pill: `#DCEFFF`
- Active pill text: `#0A2A43`
- Primary link/action: `#075985`
- Orange accent: `#FFB26B`

Why the logo stands out: the backdrop is near-black navy rather than a wave-matching mid-blue, keeping the full orange mark bright and separating the wave through luminance.

Representative contrast ratios: `#F5FAFF` on `#061827` is 17.13:1; `#C7DBEA` on `#061827` is 12.63:1; `#075985` on white is 7.56:1.

## Token architecture

Define three CSS classes—`.palette-a`, `.palette-b`, and `.palette-c`—that provide the same semantic custom properties for page, surface, hero/footer, text, muted text, primary actions, accents, pills, borders, focus, selection, decorative panels, glow, grid, and shadows.

`src/App.tsx` contains one `ACTIVE_PALETTE` constant and applies it to the site root. It defaults to `"palette-c"`. There is no user-facing theme switcher, URL control, storage behavior, or runtime preference. Selecting another proposal requires changing only that constant.

Replace all old teal/coral utility references and hard-coded green values with semantic tokens so each palette covers the whole site rather than only the screenshot locations. Existing layout, sizing, typography, animation, content, and logo assets remain unchanged.

## Report and evidence

Add a concise palette report under `docs/` with each option's label, ranked rationale, core hex values, and representative WCAG contrast ratios.

Capture nine locally served production screenshots:

- Option C desktop home hero.
- Option C mobile footer with the sticky header visible.
- Option C desktop footer.
- The same three views for Option B.
- The same three views for Option A.

Labels must identify the option in artifact names, PR captions, and report text. Screenshots must not require or display a theme switcher.

## Delivery

Create one branch and one draft pull request against `main`, defaulting to Option C. Commit all three token sets and the report. The live site remains unchanged because the PR is not merged, and the PR must remain draft and unmerged.
