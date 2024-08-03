export enum Roles {
  CUSTOMER = "Customer",
  MANAGER = "Manager",
  ADMIN = "Admin",
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
