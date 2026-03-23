/**
 * Derives alternate format paths from a base image path.
 * E.g. "/img/hero.png" → { avif: "/img/hero.avif", webp: "/img/hero.webp", original: "/img/hero.png" }
 */
export function deriveFormats(src: string) {
  const ext = src.match(/\.\w+$/)?.[0] || "";
  const base = ext ? src.slice(0, -ext.length) : src;
  return {
    avif: `${base}.avif`,
    webp: `${base}.webp`,
    original: src,
  };
}

/**
 * For an imageSet like { 360: "/img/x_360.png", 600: "/img/x_600.png" },
 * produces srcset strings for each format.
 */
export function pictureSourcesFromSet(
  imageSet: Record<string, string> | undefined,
) {
  if (!imageSet || typeof imageSet !== "object") return undefined;

  const entries = Object.entries(imageSet)
    .map(([w, url]) => [Number(w), url] as [number, string])
    .filter(([w, url]) => Number.isFinite(w) && !!url)
    .sort((a, b) => a[0] - b[0]);

  if (!entries.length) return undefined;

  const ext = entries[0][1].match(/\.\w+$/)?.[0] || "";
  const replaceExt = (url: string, newExt: string) => {
    const e = url.match(/\.\w+$/)?.[0] || "";
    return e ? url.slice(0, -e.length) + newExt : url + newExt;
  };

  const avifSrcset = entries
    .map(([w, url]) => `${replaceExt(url, ".avif")} ${w}w`)
    .join(", ");
  const webpSrcset = entries
    .map(([w, url]) => `${replaceExt(url, ".webp")} ${w}w`)
    .join(", ");
  const originalSrcset = entries.map(([w, url]) => `${url} ${w}w`).join(", ");

  const largest = entries[entries.length - 1][1];
  const smallest = entries[0][1];

  return { avifSrcset, webpSrcset, originalSrcset, largest, smallest };
}

/**
 * For a single image path, produces format variants.
 */
export function pictureSources(src: string) {
  const f = deriveFormats(src);
  return {
    avifSrcset: f.avif,
    webpSrcset: f.webp,
    fallbackSrc: f.original,
  };
}
