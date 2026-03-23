import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import 'dotenv/config';
import chroma from 'chroma-js';

const rootDir = process.cwd();
const srcDir = path.join(rootDir, 'src');
const outDir = path.join(srcDir, 'generated');
const outCss = path.join(outDir, 'theme.css');

const saltFile = path.join(rootDir, '.theme_salt');

const THEMES = [
  { base: '#0b1220', accent: '#0284c7' }, // blue
  { base: '#071a22', accent: '#0891b2' }, // cyan
  { base: '#071f1a', accent: '#0d9488' }, // teal
  { base: '#081a10', accent: '#16a34a' }, // green
  { base: '#0a1a0d', accent: '#65a30d' }, // lime
  { base: '#171006', accent: '#d97706' }, // amber
  { base: '#1a0f07', accent: '#ea580c' }, // orange
  { base: '#1f0b0b', accent: '#ef4444' }, // red
  { base: '#1e0b14', accent: '#e11d48' }, // rose
  { base: '#1b0b1a', accent: '#c026d3' }, // fuchsia
  { base: '#140b1f', accent: '#7c3aed' }, // violet
  { base: '#0f1025', accent: '#4f46e5' }, // indigo
  { base: '#0a1020', accent: '#2563eb' }, // royal blue
  { base: '#0f1a24', accent: '#0ea5e9' }, // sky
  { base: '#0b1520', accent: '#38bdf8' }, // light-sky (still ok on dark)
  { base: '#101018', accent: '#22c55e' }, // neutral + green
  { base: '#101018', accent: '#f97316' }, // neutral + orange
  { base: '#120b10', accent: '#fb7185' }, // dark + soft rose
  { base: '#0b1116', accent: '#a78bfa' }, // dark + soft violet
  { base: '#0b0f1a', accent: '#60a5fa' }, // dark + soft blue

  { base: '#0c1422', accent: '#1d4ed8' },
  { base: '#071825', accent: '#0ea5e9' },
  { base: '#061f24', accent: '#06b6d4' },
  { base: '#062019', accent: '#10b981' },
  { base: '#081b11', accent: '#22c55e' },
  { base: '#141006', accent: '#f59e0b' },
  { base: '#1a1006', accent: '#ea580c' },
  { base: '#1a0b0b', accent: '#dc2626' },
  { base: '#1d0a12', accent: '#be123c' },
  { base: '#1b0a1b', accent: '#a21caf' },
  { base: '#140a22', accent: '#6d28d9' },
  { base: '#0b0f22', accent: '#4338ca' },
  { base: '#0b1020', accent: '#1e40af' },
  { base: '#0b1420', accent: '#0369a1' },
  { base: '#0a171d', accent: '#0f766e' },
  { base: '#0a1a14', accent: '#15803d' },
  { base: '#0d1a0c', accent: '#4d7c0f' },
  { base: '#171506', accent: '#b45309' },
  { base: '#1a1408', accent: '#c2410c' },
  { base: '#1f0f0f', accent: '#b91c1c' },
  { base: '#1a0e12', accent: '#9f1239' },
  { base: '#170c18', accent: '#86198f' },
  { base: '#120b1f', accent: '#5b21b6' },
  { base: '#0b0d1f', accent: '#3730a3' },
  { base: '#0a0f1a', accent: '#1d4ed8' },
  { base: '#0a121a', accent: '#0284c7' },
  { base: '#07131a', accent: '#0891b2' },
  { base: '#071a19', accent: '#0d9488' },
  { base: '#071a12', accent: '#16a34a' },
  { base: '#101015', accent: '#e11d48' },
];

// args
const args = process.argv.slice(2);
const reroll = args.includes('--reroll') || args.includes('--random');

const seed =
  process.env.SITE_SEED ||
  process.env.PUBLIC_BRAND ||
  path.basename(rootDir);

function readSalt() {
  try {
    if (fs.existsSync(saltFile))
      return fs.readFileSync(saltFile, 'utf-8').trim();
  } catch {}
  return '';
}
function writeSalt(v) {
  try {
    fs.writeFileSync(saltFile, v, 'utf-8');
  } catch {}
}

let salt = process.env.THEME_SALT || readSalt() || '';
if (reroll) {
  salt = crypto.randomBytes(6).toString('hex');
  writeSalt(salt);
}

const hash = crypto.createHash('md5').update(`${seed}::${salt}`).digest('hex');
const idx = parseInt(hash.slice(0, 8), 16) % THEMES.length;

const theme = THEMES[idx];

function ensureReadableDark(hex) {
  let c = chroma(hex);

  c = c.desaturate(0.05);
  while (chroma.contrast(c, '#fff') < 4.5) c = c.darken(0.22);
  return c.hex();
}

const pageBg = ensureReadableDark(theme.base);
const mainBg = chroma(pageBg).brighten(0.12).hex();
const headerBg = chroma(pageBg).brighten(0.32).hex();
const footerBg = chroma(pageBg).darken(0.32).hex();

let btnBg = chroma(theme.accent).saturate(0.15);
btnBg = btnBg.mix(pageBg, 0.1, 'rgb');
while (chroma.contrast(btnBg, '#fff') < 4.5) btnBg = btnBg.darken(0.18);
btnBg = btnBg.hex();

let btnHoverBg = chroma(btnBg).brighten(0.2);
if (chroma.contrast(btnHoverBg, '#fff') < 4.5)
  btnHoverBg = chroma(btnBg).darken(0.15);
btnHoverBg = btnHoverBg.hex();

const linkHoverBg = chroma(btnBg).alpha(0.22).css();

const css = `/* generated автоматически
stamp: ${new Date().toISOString()}
seed: ${seed}
salt: ${salt || '(empty)'}
themeIndex: ${idx}
base: ${theme.base}
accent: ${theme.accent}
*/
:root{
  --page-bg: ${pageBg};
  --page-text: #ffffff;

  --main-bg: ${mainBg};
  --main-text: #ffffff;

  --header-bg: ${headerBg};
  --header-text: #ffffff;

  --footer-bg: ${footerBg};
  --footer-text: #ffffff;

  --btn-bg: ${btnBg};
  --btn-text: #ffffff;
  --btn-hover-bg: ${btnHoverBg};
  --btn-hover-text: #ffffff;

  --link-hover-bg: ${linkHoverBg};
  --link-hover-text: #ffffff;
}
`;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outCss, css, 'utf-8');

console.log(`[theme] seed="${seed}" salt="${salt}" themeIndex=${idx}`);
console.log(`[theme] wrote: ${outCss}`);
