# .github

Organisation-wide files for [Inkbar](https://github.com/inkbar).

- `profile/README.md` is the page shown at [github.com/inkbar](https://github.com/inkbar).
- `profile/header-light.png` and `profile/header-dark.png` are its header graphic. GitHub shows the one that matches the reader's colour scheme.

## Regenerating the header

`scripts/make-header.mjs` draws both images. It borrows Playwright and the brand fonts from a checkout of [inkbar/landing](https://github.com/inkbar/landing), so this repo has no dependencies of its own.

```sh
node scripts/make-header.mjs ../landing
```

Run `pnpm install` and `pnpm exec playwright install chromium` in the landing checkout first. Keep the headline in step with the landing page.
