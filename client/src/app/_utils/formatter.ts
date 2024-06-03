export function formatCompactNumber(number: number) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(number);
}

export function capitalize(string: string) {
  return string
    .split(" ")
    .map((name) => name?.replace(name[0], name[0]?.toUpperCase()))
    .join(" ");
}
