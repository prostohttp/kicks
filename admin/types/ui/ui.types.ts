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

export const optionKeys = {
    list: "List",
    select: "Select",
    checkbox: "Checkbox",
    text: "Text",
    textarea: "Textarea",
    date: "Date",
    time: "Time",
    datetime: "Date and Time",
};
