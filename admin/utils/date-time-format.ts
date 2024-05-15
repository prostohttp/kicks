import type { Locales } from "~/lang/locale-types";

export default (date: string, locale: Locales) => {
  const formatter = new Intl.DateTimeFormat(locale);
  return formatter.format(new Date(date));
};
