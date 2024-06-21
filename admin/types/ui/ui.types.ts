import { eng } from "~/lang/eng";

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
  [eng.optionTypes.list]: "select",
  [eng.optionTypes.select]: "select",
  [eng.optionTypes.checkbox]: "select",
  [eng.optionTypes.text]: "text",
  [eng.optionTypes.textarea]: "textarea",
  [eng.optionTypes.date]: "date",
  [eng.optionTypes.time]: "time",
  [eng.optionTypes.datetime]: "datetime",
};
