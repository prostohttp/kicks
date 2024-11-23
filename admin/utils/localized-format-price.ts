import { SettingsCurrency } from "~/types/ui/ui.types";
import { Locales, Currency } from "~/types/ui/ui.types";

export default (
    currency: SettingsCurrency,
    price: number,
    needCalculate: boolean,
    rate: number = 1,
): string => {
    let localizedPrice;
    if (currency === SettingsCurrency.usd) {
        localizedPrice = needCalculate
            ? currencyFormat(price * rate, Currency.usd, Locales.en)
            : currencyFormat(price, Currency.usd, Locales.en);
    } else {
        localizedPrice = needCalculate
            ? currencyFormat(price * rate, Currency.rub, Locales.ru)
            : currencyFormat(price, Currency.rub, Locales.ru);
    }
    return localizedPrice;
};
