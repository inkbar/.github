// Draws the profile header graphics, profile/header-light.png and profile/header-dark.png.
//
// The script borrows Playwright and the brand fonts from a checkout of inkbar/landing, so this
// repo needs no dependencies of its own:
//
//   node scripts/make-header.mjs ../landing
//
// Run `pnpm install` and `pnpm exec playwright install chromium` in that checkout first.
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const landing = resolve(process.argv[2] ?? '../landing')
const require = createRequire(join(landing, 'package.json'))
const { chromium } = require('@playwright/test')

const font = (pkg, file) =>
  readFileSync(join(dirname(require.resolve(`${pkg}/package.json`)), 'files', file)).toString(
    'base64'
  )
const urbanist = font('@fontsource-variable/urbanist', 'urbanist-latin-wght-normal.woff2')
const geistMono = font('@fontsource-variable/geist-mono', 'geist-mono-latin-wght-normal.woff2')

const out = join(dirname(fileURLToPath(import.meta.url)), '../profile')

const themes = {
  light: {
    ground: '#F3F4F8',
    text: '#0D1026',
    muted: '#555B75',
    tile: '#0D1026',
    glyph: '#FFFFFF',
    bar: '#FFFFFF',
    barLine: '#DADDE8',
    markText: '#0D1026',
  },
  dark: {
    ground: '#0D1026',
    text: '#FFFFFF',
    muted: '#A9AFCB',
    tile: '#FFFFFF',
    glyph: '#0D1026',
    bar: '#151935',
    barLine: '#2A2F4D',
    markText: '#0D1026',
  },
}

const icon = (paths) =>
  `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`

const tools = [
  icon('<path d="M5 3l14 8-6 2-2 6z"/>'),
  icon('<path d="M9 11l6-6 4 4-6 6H9v-4zM4 20h8"/>'),
  icon('<path d="M7 4v7a5 5 0 0010 0V4M5 20h14"/>'),
  icon('<path d="M5 5h14v10H10l-5 4z"/>'),
  icon('<path d="M4 18c3-8 5 4 8-4s4 2 8-6"/>'),
  icon('<rect x="5" y="5" width="14" height="14" rx="2"/>'),
  icon('<rect x="4" y="9" width="16" height="6" rx="1" fill="currentColor"/>'),
]

const page = (t) => `<!doctype html>
<html><head><style>
@font-face { font-family: 'Urbanist'; src: url(data:font/woff2;base64,${urbanist}) format('woff2'); font-weight: 100 900; }
@font-face { font-family: 'Geist Mono'; src: url(data:font/woff2;base64,${geistMono}) format('woff2'); font-weight: 100 900; }
* { box-sizing: border-box; }
body { margin: 0; width: 1280px; height: 400px; padding: 56px 64px; background: ${t.ground}; color: ${t.text};
  font-family: 'Urbanist'; display: flex; flex-direction: column; justify-content: space-between; }
.top { display: flex; align-items: center; justify-content: space-between; }
.logo { display: flex; align-items: center; gap: 16px; font-weight: 700; font-size: 44px; letter-spacing: -0.03em; }
.bar { display: flex; gap: 4px; padding: 8px; border-radius: 14px; background: ${t.bar}; border: 1px solid ${t.barLine}; }
.tool { width: 52px; height: 52px; display: flex; align-items: center; justify-content: center; border-radius: 10px; }
.tool.on { background: #E4FF4A; color: #0D1026; }
.bottom { display: flex; align-items: flex-end; justify-content: space-between; gap: 48px; }
h1 { margin: 0; font-weight: 700; font-size: 62px; line-height: 1.12; letter-spacing: -0.03em; max-width: 760px; isolation: isolate; }
mark { position: relative; z-index: -1; background: #E4FF4A; color: ${t.markText}; padding: 0 0.12em; border-radius: 8px; }
.works { font-family: 'Geist Mono'; font-size: 19px; color: ${t.muted}; white-space: nowrap; padding-bottom: 12px; }
</style></head><body>
<div class="top">
  <div class="logo">
    <svg viewBox="0 0 32 32" width="56" height="56"><rect width="32" height="32" rx="8" fill="${t.tile}"/><circle cx="16" cy="8.2" r="2.4" fill="${t.glyph}"/><rect x="13.8" y="12" width="4.4" height="7.5" fill="${t.glyph}"/><rect x="6" y="21" width="20" height="5" rx="1.5" fill="#E4FF4A" stroke="#0D1026" stroke-width="${t.tile === '#FFFFFF' ? 1 : 0}"/></svg>
    inkbar
  </div>
  <div class="bar">${tools.map((svg, i) => `<div class="tool${i === 1 ? ' on' : ''}">${svg}</div>`).join('')}</div>
</div>
<div class="bottom">
  <h1>A full PDF editor for your web app. <mark>No licence fee.</mark></h1>
  <div class="works">TypeScript · Vue · React · Svelte</div>
</div>
</body></html>`

const browser = await chromium.launch()
for (const [name, theme] of Object.entries(themes)) {
  const tab = await browser.newPage({
    viewport: { width: 1280, height: 400 },
    deviceScaleFactor: 2,
  })
  await tab.setContent(page(theme))
  await tab.evaluate(() => document.fonts.ready)
  const file = join(out, `header-${name}.png`)
  await tab.screenshot({ path: file })
  await tab.close()
  console.log(`wrote ${file}`)
}
await browser.close()
