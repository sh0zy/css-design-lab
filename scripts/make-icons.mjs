import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const outDir = path.resolve("assets");
await mkdir(outDir, { recursive: true });

// Brand colors
const BG = "#0F172A";
const ACCENT = "#38BDF8";
const ACCENT_2 = "#A78BFA";
const POP = "#F472B6";

// 1024x1024 full icon (background + foreground baked in)
const fullSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <defs>
    <radialGradient id="g1" cx="0.25" cy="0.18" r="0.9">
      <stop offset="0" stop-color="#1E293B"/>
      <stop offset="1" stop-color="${BG}"/>
    </radialGradient>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${ACCENT}"/>
      <stop offset="1" stop-color="${ACCENT_2}"/>
    </linearGradient>
  </defs>
  <rect width="1024" height="1024" rx="220" fill="url(#g1)"/>
  <rect x="80" y="80" width="864" height="864" rx="180" fill="none" stroke="${ACCENT}" stroke-opacity="0.35" stroke-width="6"/>
  <circle cx="800" cy="220" r="36" fill="${ACCENT_2}" opacity="0.85"/>
  <circle cx="220" cy="800" r="36" fill="${POP}" opacity="0.85"/>
  <text x="512" y="600" text-anchor="middle"
        font-family="-apple-system, Segoe UI, Helvetica, sans-serif"
        font-size="320" font-weight="800" fill="url(#brand)"
        letter-spacing="6">CSS</text>
</svg>
`;

// 1024x1024 foreground (for adaptive icon: 432dp foreground area inside 1024 canvas)
const foregroundSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <defs>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${ACCENT}"/>
      <stop offset="1" stop-color="${ACCENT_2}"/>
    </linearGradient>
  </defs>
  <rect width="1024" height="1024" fill="transparent"/>
  <text x="512" y="610" text-anchor="middle"
        font-family="-apple-system, Segoe UI, Helvetica, sans-serif"
        font-size="280" font-weight="800" fill="url(#brand)"
        letter-spacing="4">CSS</text>
  <circle cx="780" cy="280" r="26" fill="${ACCENT_2}"/>
  <circle cx="270" cy="760" r="26" fill="${POP}"/>
</svg>
`;

// 2732x2732 splash (used by capacitor-assets)
const splashSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2732 2732">
  <defs>
    <radialGradient id="g1" cx="0.5" cy="0.45" r="0.6">
      <stop offset="0" stop-color="#1E293B"/>
      <stop offset="1" stop-color="${BG}"/>
    </radialGradient>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${ACCENT}"/>
      <stop offset="1" stop-color="${ACCENT_2}"/>
    </linearGradient>
  </defs>
  <rect width="2732" height="2732" fill="url(#g1)"/>
  <text x="1366" y="1430" text-anchor="middle"
        font-family="-apple-system, Segoe UI, Helvetica, sans-serif"
        font-size="380" font-weight="800" fill="url(#brand)"
        letter-spacing="8">CSS Design Lab</text>
  <text x="1366" y="1540" text-anchor="middle"
        font-family="-apple-system, Segoe UI, Helvetica, sans-serif"
        font-size="80" font-weight="500" fill="#94A3B8"
        letter-spacing="4">Style Studio Learning</text>
</svg>
`;

async function svgToPng(svg, file, size) {
  await sharp(Buffer.from(svg))
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(outDir, file));
  console.log("wrote", file);
}

async function svgToPngBg(svg, file, size, bg) {
  await sharp(Buffer.from(svg))
    .flatten({ background: bg })
    .resize(size, size)
    .png()
    .toFile(path.join(outDir, file));
  console.log("wrote", file);
}

await svgToPngBg(fullSvg, "icon.png", 1024, BG);
await svgToPng(foregroundSvg, "icon-foreground.png", 1024);

// solid background for adaptive icon
await sharp({
  create: {
    width: 1024,
    height: 1024,
    channels: 4,
    background: BG,
  },
})
  .png()
  .toFile(path.join(outDir, "icon-background.png"));
console.log("wrote icon-background.png");

await svgToPngBg(splashSvg, "splash.png", 2732, BG);
// dark variant uses same image
await svgToPngBg(splashSvg, "splash-dark.png", 2732, BG);
