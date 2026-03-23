import { createCanvas } from '@napi-rs/canvas';

/**
 * Renders a site icon (512x512) with brand initial on a styled background.
 * @param {string} brand - Brand name
 * @param {string} [color='#0284c7'] - Accent color
 * @returns {Promise<Buffer>} PNG buffer
 */
export async function renderIcon(brand, color = '#0284c7') {
  const size = 512;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  const r = size * 0.15;
  drawRoundRect(ctx, 0, 0, size, size, r);
  const grad = ctx.createLinearGradient(0, 0, size, size);
  grad.addColorStop(0, darken(color, 0.35));
  grad.addColorStop(1, color);
  ctx.fillStyle = grad;
  ctx.fill();

  const letter = pickLetters(brand, 2);
  const fontSize = letter.length > 1 ? size * 0.34 : size * 0.48;
  ctx.font = `bold ${fontSize}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillStyle = 'rgba(255,255,255,0.12)';
  ctx.fillText(letter, size / 2 + 2, size / 2 + 2);

  ctx.fillStyle = '#ffffff';
  ctx.fillText(letter, size / 2, size / 2);

  return canvas.toBuffer('image/png');
}

/**
 * Renders a favicon source (512x512) - bolder and simpler for small display.
 * @param {string} brand - Brand name
 * @param {string} [color='#0284c7'] - Accent color
 * @returns {Promise<Buffer>} PNG buffer
 */
export async function renderFavicon(brand, color = '#0284c7') {
  const size = 512;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  const r = size * 0.2;
  drawRoundRect(ctx, 0, 0, size, size, r);
  ctx.fillStyle = color;
  ctx.fill();

  const letter = pickLetters(brand, 1);
  const fontSize = size * 0.58;
  ctx.font = `900 ${fontSize}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.fillText(letter, size / 2 + 3, size / 2 + 3);

  ctx.fillStyle = '#ffffff';
  ctx.fillText(letter, size / 2, size / 2);

  return canvas.toBuffer('image/png');
}

function pickLetters(brand, count) {
  const cleaned = (brand || 'B').replace(/[^a-zA-Z0-9]/g, '');
  return cleaned.substring(0, count).toUpperCase() || 'B';
}

function darken(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.round(((num >> 16) & 0xff) * (1 - amount)));
  const g = Math.max(0, Math.round(((num >> 8) & 0xff) * (1 - amount)));
  const b = Math.max(0, Math.round((num & 0xff) * (1 - amount)));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

function drawRoundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
