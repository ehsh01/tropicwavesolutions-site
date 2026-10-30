# Approved Logo Replacement Design

## Goal

Replace every use of the current Tropic Wave Solutions mark with Ernesto's approved transparent palm-and-wave “TW” artwork while preserving the site's existing layout and loading behavior.

## Asset strategy

The supplied `tw-logo-transparent.png` is the canonical source. Generated derivatives are committed under `public/` so GitHub Pages serves them as ordinary static files. A checked-in Sharp-based generator keeps the outputs reproducible without adding a new deployment step; the repository's existing social-image generation hook may invoke the expanded generator.

The generated set includes:

- A lossless canonical PNG retaining the source transparency.
- An optimized WebP near twice the largest header/footer display size.
- A larger transparent WebP for the home-page hero.
- Transparent 16×16 and 32×32 PNG favicons.
- A multi-size transparent `favicon.ico` containing 16px and 32px images.
- A transparent 180×180 Apple touch icon.
- A 1200×630 social share image with the logo centered on a clean off-white background.

Square icon canvases preserve the logo's approximately 1.38:1 aspect ratio and center it with transparent padding.

## Site integration

Update the header, footer, and home-page hero to use the generated assets. Existing displayed heights and surrounding layout remain unchanged; image widths become automatic so the approved artwork is not distorted. Metadata uses the PNG favicon set, the ICO fallback, Apple touch icon, new social card, and canonical PNG organization logo.

Remove the superseded `public/logo.svg` and `public/favicon.svg`, replace the old social card, and verify no source or generated page references either old SVG.

No splash or loading screen will be added or changed.

## Verification

Run the asset generator, confirm image dimensions and alpha handling, search for stale old-logo references, and run the complete repository validation suite. Serve the production build locally and manually verify:

- Header and footer at desktop and mobile widths.
- Home-page hero placement.
- Browser-tab favicon.

Capture concise screenshots demonstrating the required desktop/mobile logo placements and favicon. Include those artifacts in the pull-request description. The pull request remains open and unmerged.
