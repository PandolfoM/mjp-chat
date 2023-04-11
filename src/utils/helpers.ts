import moment from "moment";

export function randomPfpColor(): string {
  const pool: Array<string> = ["red", "blue", "grape", "lime", "yellow"];
  let color = pool[Math.floor(Math.random() * pool.length)];
  return color;
}

export function formatTime(time: any): string {
  const pastDate = moment(time.seconds * 1000).calendar(null, {
    sameDay: "[Today at] LT",
    lastDay: "[Yesterday at] LT",
  });
  if (pastDate.includes("Yesterday") || pastDate.includes("Today"))
    return pastDate;

  const date = moment(time.seconds * 1000).format("L LT");
  return date;
}
