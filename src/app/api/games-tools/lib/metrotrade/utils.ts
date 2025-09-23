export function rand(seed: number) { // mulberry32
  let t = seed + 0x6D2B79F5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
export function nextSeed(seed: number) {
  return (seed * 1664525 + 1013904223) >>> 0;
}
export function rollDice(seed: number): { d1: number; d2: number; seed: number } {
  const s1 = nextSeed(seed); const r1 = Math.floor(rand(s1) * 6) + 1;
  const s2 = nextSeed(s1); const r2 = Math.floor(rand(s2) * 6) + 1;
  return { d1: r1, d2: r2, seed: nextSeed(s2) };
}
export function wrap(pos: number) { return ((pos % 40) + 40) % 40; }
