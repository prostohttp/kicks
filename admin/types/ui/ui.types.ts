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
  EN = "en-US",
  RU = "ru",
}

export enum Currency {
  USD = "USD",
  RUB = "RUB",
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
  [locale["en"].optionTypes.list]: "select",
  [locale["en"].optionTypes.select]: "select",
  [locale["en"].optionTypes.checkbox]: "select",
  [locale["en"].optionTypes.text]: "text",
  [locale["en"].optionTypes.textarea]: "textarea",
  [locale["en"].optionTypes.date]: "date",
  [locale["en"].optionTypes.time]: "time",
  [locale["en"].optionTypes.datetime]: "datetime",
};
