# RunwayMemo on Hostinger

Production URL: https://www.runwaymemo.com

The `main` branch is source code. The `hostinger-deploy` branch contains compiled static files at its root, plus Apache/LiteSpeed routing in `.htaccess`. Hostinger Git does not build Next.js; connect **hostinger-deploy**, never main.

## First connection

1. In Hostinger Websites, add a **Custom PHP/HTML** website to your existing hosting plan, start empty, and select `runwaymemo.com`. This requires an available ordinary website slot; it does not require a Node.js app slot.
2. Open that website's Dashboard → Advanced → Git → Connect with GitHub. Authorize the RunwayMemo repository only.
3. Repository: `PrajaktaAdlytica/runway-memo-site`; branch: `hostinger-deploy`; deployment directory: the website's `public_html` root. In the legacy Git form, leave the optional directory field blank to use public_html.
4. The target must be empty for the initial deployment. Back up any existing website files before replacing them. Deploy, then enable auto-deployment if the UI offers a separate switch. For legacy Git, configure the supplied Auto Deployment webhook in GitHub.
5. Follow Hostinger's domain connection instructions for this hosting plan. Ensure both `runwaymemo.com` and `www.runwaymemo.com` resolve to this website; use the DNS targets shown in your dashboard, not guessed records. Preserve email MX/TXT records.
6. Activate SSL for both names, enable HTTPS and configure the preferred host to redirect the bare domain to `https://www.runwaymemo.com`. Check for redirect loops.
7. Verify home, `/product`, `/modules/weekly-cash`, `/demo`, `/contact`, `/sign-in`, refresh on nested routes, a nonexistent URL (custom 404), mobile and reduced motion. Test the demo and preview form. Keep Vercel available until these checks pass.

## Future releases

Push source changes to `main`. GitHub Actions → **Build Hostinger website** installs dependencies, runs checks, builds with SITE_URL=https://www.runwaymemo.com and commits the export to `hostinger-deploy`. Hostinger then pulls that branch automatically when connected through its GitHub App (or a configured legacy webhook).

You can also run the workflow manually under Actions → Build Hostinger website → Run workflow. Enable GitHub Actions for the repository if disabled. A failed build does not replace the published branch. Do not edit compiled files by hand.

No Hostinger Node start command, build command or environment variables are required. No secrets are included in the static branch. Authentication, lead submission and analytics remain concept-preview functionality; hosting does not add a backend.

## Local export

```sh
npm ci
SITE_URL=https://www.runwaymemo.com npm run build
python3 scripts/check-export.py
cp deploy/hostinger/.htaccess out/.htaccess
```

Official references:
- https://docs.hostinger.com/websites/git
- https://www.hostinger.com/support/hostinger-node-js-limits-for-web-and-cloud-plans/
