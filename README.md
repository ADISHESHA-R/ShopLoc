## Consent-based location collection (demo)

This repo is designed for **GitHub Pages**: a **single `index.html`** shopping page that can request the user’s location **only with explicit consent** (button + browser prompt), then sends it to an endpoint you control (so you can view/store it “in your system”).

### What this is NOT

- It does **not** collect location silently.
- It does **not** run in the background when the page is closed.

### Deploy on GitHub Pages

1) Push this repo to GitHub.

2) In GitHub: **Settings → Pages → Build and deployment**

- **Source**: “Deploy from a branch”
- **Branch**: `main` (or your default branch), `/root`

3) Open your GitHub Pages URL, and set the **Endpoint URL** field on the page.

### Endpoint options (you still need one)

GitHub Pages is static-only, so it can’t receive/store POSTs.
Use one of these as your endpoint:

- **Google Apps Script (recommended)**: store rows in a Google Sheet
- **Cloudflare Worker**: store in KV/D1
- **Supabase/Firebase**: store in a table/collection

### Notes for iOS Safari

- Location requires a **permission prompt**.
- Location updates will generally stop when the page is no longer active.

