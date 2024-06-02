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
