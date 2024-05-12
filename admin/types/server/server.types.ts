export enum Roles {
  CUSTOMER = "customer",
  MANAGER = "manager",
  ADMIN = "admin",
}

export enum OrderStatus {
  SOLD = "sold",
  PROCESSING = "processing",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export enum ModelNamesForSearchEngine {
  CATEGORY = "categories",
  PRODUCT = "products",
  ARTICLES = "articles",
  BRAND = "brands",
  ALL = "all",
}

export enum OptionTypes {
  SELECT = "select",
  CHECKBOX = "checkbox",
  RADIO = "radio",
  IMAGE = "image",
  SLIDER = "slider",
  COLOR = "color",
}

export interface MultiPartData {
  data: Buffer;
  name?: string;
  filename?: string;
  type?: string;
}

export interface OptionValue {
  valueId: string;
  productCount: string;
}

export interface Option {
  optionId: string;
  values: OptionValue[];
}

export interface Options {
  options: Option[];
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
