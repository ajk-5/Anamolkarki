export function formatTime(ms: number): string {
  const t = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(t / 60).toString().padStart(2, '0');
  const s = (t % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}
