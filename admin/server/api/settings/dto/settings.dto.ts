import { SettingsLocale as locale } from "~/types/ui/ui.types";
import { SettingsCurrency as currency } from "~/types/ui/ui.types";

export interface SettingsLocale {
    title: string;
    phone: string;
    description: string;
    email: string;
    address: string;
}

export interface SettingsDto {
    _id?: string;
    image: string;
    localeDashboard: {
        value: locale.ru | locale.en;
        label: string;
    };
    localeStore: {
        label: string;
        value: locale.ru | locale.en;
    };
    startOrderStatus: string;
    endOrderStatus: string;
    currency: {
        label: string;
        value: currency.rub | currency.usd;
    };
    secondCurrencyRate: number;
    mainCurrency: {
        label: string;
        value: currency.rub | currency.usd;
    };
    ru: SettingsLocale;
    en: SettingsLocale;
}
