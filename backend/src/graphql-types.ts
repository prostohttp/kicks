
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum SettingsLocale {
    en = "en",
    ru = "ru"
}

export class InputNotification {
    order: string;
    isRead: boolean;
    createdAt: Date;
}

export class FlatProducts {
    productId: string;
    productCount: number;
}

export class InputOrder {
    orderId: string;
    products: FlatProducts[];
    customer: string;
    shipping: string;
    payment: string;
    date: string;
    shippingAddress?: Nullable<string>;
    status: string;
    note?: Nullable<string>;
}

export interface BasicArticle {
    _id?: Nullable<string>;
    title: string;
    shortDescription: string;
    description?: Nullable<string>;
    isEnabled: boolean;
    adminMenu: boolean;
    siteMenu: boolean;
    image?: Nullable<string>;
    sort: number;
    createdAt: Date;
}

export interface BasicProduct {
    _id?: Nullable<string>;
    title: string;
    shortDescription: string;
    description?: Nullable<string>;
    sku?: Nullable<string>;
    quantity: number;
    regularPrice: number;
    salePrice?: Nullable<number>;
    tags?: Nullable<string[]>;
    additionImages?: Nullable<string[]>;
    isEnabled: ProductType;
    createdAt: Date;
}

export class Article implements BasicArticle {
    _id?: Nullable<string>;
    title: string;
    shortDescription: string;
    description?: Nullable<string>;
    isEnabled: boolean;
    adminMenu: boolean;
    siteMenu: boolean;
    image?: Nullable<string>;
    sort: number;
    featuredProducts?: Nullable<Product[]>;
    createdAt: Date;
}

export class FlatArticle implements BasicArticle {
    _id?: Nullable<string>;
    title: string;
    shortDescription: string;
    description?: Nullable<string>;
    isEnabled: boolean;
    adminMenu: boolean;
    siteMenu: boolean;
    image?: Nullable<string>;
    sort: number;
    createdAt: Date;
}

export abstract class IQuery {
    article?: Nullable<Article>;
    articles?: Nullable<FlatArticle[]>;
    banner?: Nullable<Banner>;
    brand?: Nullable<Brand>;
    brands?: Nullable<Brand[]>;
    category?: Nullable<Category>;
    categories?: Nullable<Category[]>;
    notification?: Nullable<Notification>;
    option?: Nullable<Option>;
    options?: Nullable<Nullable<Option>[]>;
    orderStatus?: Nullable<OrderStatus>;
    orderStatuses?: Nullable<OrderStatus[]>;
    order?: Nullable<Order>;
    orders?: Nullable<Nullable<Order>[]>;
    payment?: Nullable<Payment>;
    payments: Payment[];
    product?: Nullable<Product>;
    productsByBrand?: Nullable<ProductWithBrand[]>;
    productsByCategory?: Nullable<ProductWithCategory[]>;
    settings?: Nullable<Settings>;
    shipping?: Nullable<Shipping>;
    shippings?: Nullable<Shipping[]>;
    user?: Nullable<User>;
}

export class UserSignInInput {
    name: string;
    email: Email;
    password: string;
}

export class UserLogInInput {
    email: Email;
    password: string;
}

export class BannerItem {
    _id?: Nullable<string>;
    id: number;
    heading?: Nullable<string>;
    description?: Nullable<string>;
    image: string;
    url?: Nullable<string>;
    sort: number;
}

export class Banner {
    title: string;
    banners: BannerItem[];
}

export class Brand {
    _id?: Nullable<string>;
    title: string;
    description?: Nullable<string>;
    image?: Nullable<string>;
}

export class Category {
    _id?: Nullable<string>;
    title: string;
    image?: Nullable<string>;
    description?: Nullable<string>;
    children?: Nullable<Nullable<Category>[]>;
    isEnabled: boolean;
}

export class Notification {
    _id?: Nullable<string>;
    order: string;
    isRead: boolean;
    createdAt: Date;
}

export abstract class IMutation {
    addNotfication?: Notification;
    addOrder?: NewOrderResponse;
}

export class OptionValue {
    _id?: Nullable<string>;
    value: string;
    sort: number;
    image?: Nullable<string>;
}

export class Option {
    _id?: Nullable<string>;
    title: string;
    type: string;
    sort: number;
    values?: Nullable<Nullable<OptionValue>[]>;
}

export class OrderStatus {
    _id?: Nullable<string>;
    en: string;
    ru: string;
}

export class Products {
    productId: Product;
    productCount: number;
}

export class FlatProductsType {
    productId: string;
    productCount: number;
}

export class Order {
    _id?: Nullable<string>;
    orderId: string;
    products?: Nullable<Nullable<Products>[]>;
    customer: User;
    shipping: Shipping;
    payment: Payment;
    shippingAddress?: Nullable<string>;
    status: OrderStatus;
    date: Date;
    note?: Nullable<string>;
}

export class NewOrder {
    _id: string;
    orderId: string;
    products: FlatProductsType[];
    customer: string;
    shipping: string;
    payment: string;
    shippingAddress?: Nullable<string>;
    status: string;
    date: string;
    note?: Nullable<string>;
}

export class NewOrderResponse {
    order: NewOrder;
    notification: Notification;
}

export class Payment {
    _id?: Nullable<string>;
    title: string;
}

export class OptionItemValue {
    optionValue: OptionValue;
    price?: Nullable<number>;
    count?: Nullable<number>;
}

export class OptionItem {
    optionValue: Option;
    value?: Nullable<string>;
    required: boolean;
    sort: number;
    values?: Nullable<OptionItemValue[]>;
}

export class ProductType {
    label: string;
    value: boolean;
}

export class Product implements BasicProduct {
    _id?: Nullable<string>;
    title: string;
    shortDescription: string;
    description?: Nullable<string>;
    category?: Nullable<Category[]>;
    options?: Nullable<OptionItem[]>;
    brand?: Nullable<Brand>;
    sku?: Nullable<string>;
    quantity: number;
    regularPrice: number;
    salePrice?: Nullable<number>;
    tags?: Nullable<string[]>;
    additionImages?: Nullable<string[]>;
    isEnabled: ProductType;
    createdAt: Date;
}

export class ProductWithBrand implements BasicProduct {
    _id?: Nullable<string>;
    title: string;
    shortDescription: string;
    description?: Nullable<string>;
    brand?: Nullable<Brand>;
    sku?: Nullable<string>;
    quantity: number;
    regularPrice: number;
    salePrice?: Nullable<number>;
    tags?: Nullable<string[]>;
    additionImages?: Nullable<string[]>;
    isEnabled: ProductType;
    createdAt: Date;
}

export class ProductWithCategory implements BasicProduct {
    _id?: Nullable<string>;
    title: string;
    shortDescription: string;
    description?: Nullable<string>;
    category?: Nullable<Category[]>;
    sku?: Nullable<string>;
    quantity: number;
    regularPrice: number;
    salePrice?: Nullable<number>;
    tags?: Nullable<string[]>;
    additionImages?: Nullable<string[]>;
    isEnabled: ProductType;
    createdAt: Date;
}

export class SettingsType {
    value: string;
    label: string;
}

export class SettingsLangType {
    title: string;
    phone: string;
    description: string;
    email: string;
    address?: Nullable<string>;
}

export class Settings {
    image?: Nullable<string>;
    localeStore?: Nullable<SettingsType>;
    currency?: Nullable<SettingsType>;
    mainCurrency?: Nullable<SettingsType>;
    secondCurrencyRate: number;
    startOrderStatus: OrderStatus;
    endOrderStatus: OrderStatus;
    en?: Nullable<SettingsLangType>;
    ru?: Nullable<SettingsLangType>;
}

export class Shipping {
    _id?: Nullable<string>;
    title: string;
    description?: Nullable<string>;
    price?: Nullable<number>;
}

export class User {
    _id?: Nullable<string>;
    name: string;
    email: string;
    role: string;
    image?: Nullable<string>;
    address?: Nullable<string>;
    orders?: Nullable<Order[]>;
}

export type Email = any;
type Nullable<T> = T | null;
