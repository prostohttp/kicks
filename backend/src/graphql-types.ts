
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Article {
    _id?: Nullable<MongoId>;
    title: string;
    shortDescription: string;
    description?: Nullable<string>;
    isEnabled: boolean;
    adminMenu: boolean;
    siteMenu: boolean;
    image?: Nullable<string>;
    featuredProducts: Product[];
    createdAt: Date;
}

export abstract class IQuery {
    article?: Nullable<Article>;
    articles: Article[];
    articlesForPagination?: Article[];
}

export class Banner {
    _id?: Nullable<MongoId>;
    id: number;
    heading?: Nullable<string>;
    image: string;
    url?: Nullable<string>;
    sort: number;
}

export class Brand {
    _id?: Nullable<MongoId>;
    title: string;
    description?: Nullable<string>;
    image?: Nullable<string>;
}

export class Category {
    _id?: Nullable<MongoId>;
    title: string;
    image?: Nullable<string>;
    description?: Nullable<string>;
    isParent: boolean;
    children: Category[];
    isEnabled: boolean;
}

export class Notification {
    _id?: Nullable<MongoId>;
    order: Order;
    isRead: boolean;
    createdAt: Date;
}

export class OptionValue {
    _id?: Nullable<MongoId>;
    value: string;
    sort: number;
    image?: Nullable<string>;
}

export class Option {
    _id?: Nullable<MongoId>;
    title: string;
    value: string;
    type: string;
    sort: number;
    values: OptionValue[];
}

export class OrderProduct {
    productId?: Nullable<Product>;
    productCount: number;
}

export class Order {
    _id?: Nullable<MongoId>;
    orderId: MongoId;
    products: OrderProduct[];
    customerId: User;
    shipping: Shipping;
    shippingAddress?: Nullable<string>;
    payment: Payment;
    status: string;
    date: string;
    note?: Nullable<string>;
}

export class Payment {
    _id?: Nullable<MongoId>;
    title: string;
}

export class ProductType {
    label: string;
    value: boolean;
}

export class Product {
    _id?: Nullable<MongoId>;
    title: string;
    shortDescription: string;
    description?: Nullable<string>;
    category: Category[];
    options: Option[];
    brand?: Nullable<Brand>;
    sku?: Nullable<string>;
    quantity: number;
    regularPrice: number;
    salePrice?: Nullable<number>;
    tags: Nullable<string>[];
    additionImages: Nullable<string>[];
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
    localeDashboard?: Nullable<SettingsType>;
    currency?: Nullable<SettingsType>;
    mainCurrency?: Nullable<SettingsType>;
    secondCurrencyRate: number;
    en?: Nullable<SettingsLangType>;
    ru?: Nullable<SettingsLangType>;
}

export class Shipping {
    _id?: Nullable<MongoId>;
    title: string;
    description?: Nullable<string>;
    price: number;
}

export class User {
    _id?: Nullable<MongoId>;
    name: string;
    email: string;
    role: string;
    image?: Nullable<string>;
    orders: Order[];
}

export type MongoId = any;
type Nullable<T> = T | null;
