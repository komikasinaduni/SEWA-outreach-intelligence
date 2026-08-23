# SEWA Outreach Intelligence

A Greater Houston business directory for community outreach. The working slice includes source-checked business records, evidence-backed confidence labels, verification states, outreach statuses, filters, and filtered CSV export.

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

Fabricated preview records were removed. New records should include a real source URL and independently checked address and phone before entering the outreach-ready dataset.
