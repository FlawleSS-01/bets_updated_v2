export function hashToInt(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function pickIndex(length: number, seed: string): number {
  if (!length) return 0;
  return hashToInt(seed) % length;
}
