# Tropic Wave Solutions LLC

Static website for a Florida software company that designs, builds, and operates web apps, SaaS tools, workflow applications, integrations, and automation. The site is built with Vite, React, TypeScript, Tailwind CSS, wouter, and Framer Motion.

## Local development

```bash
npm ci
npm run dev
```

Run the complete validation suite with:

```bash
npm run validate
```

## Deployment

GitHub Actions builds `main` and deploys `dist/` to GitHub Pages. A repository administrator must configure Pages to use **GitHub Actions** as its source and point DNS at GitHub Pages. The custom domain is declared in `public/CNAME`.

Optional repository secret:

- `VITE_WEB3FORMS_KEY` — Web3Forms access key used at build time. If it is not set, the Contact page shows a direct email option instead of a form.

No server, database, or paid runtime service is required.
