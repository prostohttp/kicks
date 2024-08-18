import * as v from "valibot";
import { locale } from "~/lang/locale";

export default (lang: "en" | "ru") => {
  return v.object({
    logo: v.pipe(
      v.string(locale[useSettingsDataStore().locale].error.required),
      v.minLength(1, locale[useSettingsDataStore().locale].error.required),
    ),
    localeDashboard: v.picklist(["ru", "en"], locale[lang].error.required),
    localeStore: v.picklist(["ru", "en"], locale[lang].error.required),
    currency: v.picklist(["usd", "rub"], locale[lang].error.required),
    secondCurrencyRate: v.number(locale[lang].error.required),
    mainCurrency: v.picklist(["usd", "rub"], locale[lang].error.required),
    "en.title": v.pipe(v.string(), v.minLength(1, locale[lang].error.required)),
    "en.description": v.pipe(
      v.string(),
      v.minLength(1, locale[lang].error.required),
    ),
    "en.email": v.pipe(v.string(), v.minLength(1, locale[lang].error.required)),
    "en.address": v.pipe(
      v.string(),
      v.minLength(1, locale[lang].error.required),
    ),
    "en.phone": v.pipe(v.string(), v.minLength(1, locale[lang].error.required)),
    "ru.title": v.pipe(v.string(), v.minLength(1, locale[lang].error.required)),
    "ru.description": v.pipe(
      v.string(),
      v.minLength(1, locale[lang].error.required),
    ),
    "ru.email": v.pipe(v.string(), v.minLength(1, locale[lang].error.required)),
    "ru.address": v.pipe(
      v.string(),
      v.minLength(1, locale[lang].error.required),
    ),
    "ru.phone": v.pipe(v.string(), v.minLength(1, locale[lang].error.required)),
  });
};
