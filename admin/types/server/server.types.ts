import { SettingsCurrency } from "~/types/ui/ui.types";

export enum Roles {
    CUSTOMER = "Customer",
    MANAGER = "Manager",
    ADMIN = "Admin",
}

export enum OrderStatusTypes {
    SOLD = "SOLD",
    PROCESSING = "PROCESSING",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
}

export enum ModelNamesForSearchEngine {
    CATEGORY = "categories",
    PRODUCT = "products",
    PRODUCT_WITH_PAGINATION = "productsWithPagination",
    ARTICLES = "articles",
    BRAND = "brands",
    ALL = "all",
}

export enum ProductOptionPriceAction {
    DEC = "decrease",
    INC = "increase",
}

export interface MultiPartData {
    data: Buffer;
    name?: string;
    filename?: string;
    type?: string;
}

export interface ValueOption {
    _id?: string;
    id: number;
    value: string;
    sort: number | undefined;
    image: string;
}

export interface UiOptionDto {
    _id: string;
    title: string;
    type: string;
    sort: number | undefined;
    values: ValueOption[];
}

export interface TitleObjectAfterPopulate {
    _id: string;
    title: string;
}

export interface RegisterFormDto {
    name: string;
    email: string;
    password: string;
    terms: boolean;
    keepLogged: boolean;
}

export interface LoginFormDto {
    email: string;
    password: string;
}

export interface EmailRegisterDto {
    name: string;
    userEmail: string;
    siteName: string;
    siteUrl: string;
}

export interface ForgotFormDto {
    email: string;
}

export interface ResetPasswordDto {
    password: string;
}

export interface AuthenticatedUserDto {
    name: string;
    email: string;
    role: Roles;
    image?: string;
}

export type LanguageLocale = SettingsLocale.en | SettingsLocale.ru;

export type CurrencyLocale = SettingsCurrency.usd | SettingsCurrency.rub;
