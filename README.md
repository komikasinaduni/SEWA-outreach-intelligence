# SEWA Outreach Intelligence

A Greater Houston business directory for community outreach. The first working slice includes 50 structured preview records, evidence-backed confidence labels, verification states, outreach statuses, filters, and filtered CSV export.

## Live app

https://komikasinaduni.github.io/SEWA-outreach-intelligence/

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000/SEWA-outreach-intelligence/.

## Checks

```bash
npm run lint
npm run build
```

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds the static Next.js export and deploys it to GitHub Pages whenever `main` changes.

The current preview records are placeholders for the discovery pipeline. They should be replaced with source-verified public business data before outreach use.
