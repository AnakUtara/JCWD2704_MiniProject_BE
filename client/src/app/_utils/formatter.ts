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

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
};

export const formatDate = (dates: string) => {
  const date = new Date(dates);
  return date.toLocaleDateString();
};

export const formatHour = (dates: string) => {
  const date = new Date(dates);
  return date.getHours;
};
