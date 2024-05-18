import type { Currency, Locales } from "~/types/ui/ui.types";

export default (count: number, currency: Currency, locale: Locales) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    notation: "compact",
  });
  return formatter.format(count);
};
