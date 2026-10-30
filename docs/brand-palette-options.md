# Brand palette options

| Rank | Option | Core colors | Representative WCAG ratios |
| --- | --- | --- | --- |
| 1 | C — Porcelain Sky | Hero/footer/page `#F7FAFC`; soft sky/active pill `#DCEEFF`; heading `#111827`; muted `#475569`; primary `#0B5F8A`; strong orange `#A83D00`; soft orange `#FFB067` | `#111827` on `#F7FAFC` 16.92:1; `#475569` on `#F7FAFC` 7.23:1; `#0B5F8A` on white 6.96:1 |
| 2 | B — Graphite + Amber | Hero/footer `#17191F`; raised surface `#262B33`; light text `#F9FAFB`; muted light text `#D1D5DB`; active pill `#FFF0E1`; pill text `#5A2600`; strong orange `#B64700`; light orange `#FFB56F` | `#F9FAFB` on `#17191F` 16.81:1; `#D1D5DB` on `#17191F` 11.92:1; `#B64700` on white 5.40:1 |
| 3 | A — Midnight Ocean | Hero/footer `#061827`; raised surface `#0B3555`; light text `#F5FAFF`; muted light text `#C7DBEA`; active pill `#DCEFFF`; pill text `#0A2A43`; primary `#075985`; orange `#FFB26B` | `#F5FAFF` on `#061827` 17.13:1; `#C7DBEA` on `#061827` 12.63:1; `#075985` on white 7.56:1 |

Option C makes the orange palm and blue wave stand out because its near-neutral porcelain background shares neither logo hue.

Option B makes the logo stand out because neutral graphite avoids blue-on-blue competition while strongly separating the orange palm and the wave's lighter highlights.

Option A makes the logo stand out because near-black navy keeps the orange mark bright while separating the blue wave through luminance.

The runtime defaults to Option C. Each option implements the same semantic token contract in `src/palettes.css`; selecting another approved mockup requires changing only `ACTIVE_PALETTE` in `src/App.tsx`.
