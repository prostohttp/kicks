import { locale } from "~/lang/locale";

export interface AccordionItem {
  label: string;
  slot?: string;
  disabled?: boolean;
  content?: any;
  defaultOpen?: boolean;
  closeOthers?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  to?: string;
  isActive?: boolean;
}

export enum Locales {
  en = "en-US",
  ru = "ru",
}

export enum Currency {
  usd = "USD",
  rub = "RUB",
}

export enum SettingsCurrency {
  usd = "usd",
  rub = "rub",
}

export enum SettingsLocale {
  ru = "ru",
  en = "en",
}

export interface UserData {
  label: string;
  name: string;
  placeholder: string;
  icon: string;
  type?: string;
  disabled?: boolean;
}

export interface InputData {
  label: string;
  name: string;
  placeholder: string;
  icon?: string;
  type?: string;
  disabled?: boolean;
}

export const optionTypes = {
  [locale[SettingsLocale.en].optionTypes.list]: "select",
  [locale[SettingsLocale.en].optionTypes.select]: "select",
  [locale[SettingsLocale.en].optionTypes.checkbox]: "select",
  [locale[SettingsLocale.en].optionTypes.text]: "text",
  [locale[SettingsLocale.en].optionTypes.textarea]: "textarea",
  [locale[SettingsLocale.en].optionTypes.date]: "date",
  [locale[SettingsLocale.en].optionTypes.time]: "time",
  [locale[SettingsLocale.en].optionTypes.datetime]: "datetime",
};
