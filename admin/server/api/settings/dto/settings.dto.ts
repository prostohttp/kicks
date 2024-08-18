export interface SettingsLocale {
  title: string;
  phone: string;
  description: string;
  email: string;
  address: string;
}

export interface SettingsDto {
  _id?: string;
  logo: string;
  localeDashboard: string;
  localeStore: string;
  currency: string;
  secondCurrencyRate: number;
  mainCurrency: string;
  en: SettingsLocale;
  ru: SettingsLocale;
}
