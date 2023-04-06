export function randomPfpColor(): string {
  const pool: Array<string> = ["red", "blue", "grape", "lime", "yellow"];
  let color = pool[Math.floor(Math.random() * pool.length)];
  return color;
}
