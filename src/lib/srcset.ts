export function srcSetFrom(imageSet: Record<string, string> | undefined): string | undefined {
  if (!imageSet || typeof imageSet !== "object") return undefined;

  const items = Object.entries(imageSet)
    .map(([w, url]) => [Number(w), url] as [number, string])
    .filter(([w, url]) => Number.isFinite(w) && !!url)
    .sort((a, b) => a[0] - b[0]);

  if (!items.length) return undefined;

  return items.map(([w, url]) => `${url} ${w}w`).join(", ");
}

export function pickLargest(imageSet: Record<string, string> | undefined): string | undefined {
  if (!imageSet || typeof imageSet !== "object") return undefined;

  let bestW = -Infinity;
  let bestUrl: string | undefined;

  for (const [w, url] of Object.entries(imageSet)) {
    const n = Number(w);
    if (!Number.isFinite(n) || !url) continue;
    if (n > bestW) {
      bestW = n;
      bestUrl = url;
    }
  }

  return bestUrl;
}
