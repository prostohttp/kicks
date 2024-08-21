import { SettingsCurrency } from "~/types/ui/ui.types";
import { Locales, Currency } from "~/types/ui/ui.types";

export default (
  currency: SettingsCurrency,
  price: number,
  rate: number = 1,
): string => {
  let localizedPrice;
  if (currency === SettingsCurrency.usd) {
    localizedPrice = currencyFormat(price * rate, Currency.usd, Locales.en);
  } else {
    localizedPrice = currencyFormat(price * rate, Currency.rub, Locales.ru);
  }
  return localizedPrice;
};
