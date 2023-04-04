export function randomPfpColor(): string {
  const pool: Array<string> = [
    "#e65045",
    "#52b041",
    "#4491e3",
    "#ad65d6",
    "#e3ac22",
  ];
  let color = pool[Math.floor(Math.random() * pool.length)];
  return color;
}
