import type { Locales } from "~/types/ui/ui.types";

export default (date: string, locale: Locales) => {
  const formatter = new Intl.DateTimeFormat(locale);
  return formatter.format(new Date(date));
};
