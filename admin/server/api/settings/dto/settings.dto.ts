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
    value: locale.ru | locale.en;
    label: string;
  };
  currency: {
    value: currency.rub | currency.usd;
    label: string;
  };
  secondCurrencyRate: number;
  mainCurrency: {
    value: currency.rub | currency.usd;
    label: string;
  };
  en: SettingsLocale;
  ru: SettingsLocale;
}
