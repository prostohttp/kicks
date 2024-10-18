
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Article {
    _id: string;
}

export class Banner {
    _id: string;
}

export class Brand {
    _id: string;
}

export class Category {
    _id: string;
}

export class Notification {
    _id: string;
}

export class Option {
    _id: string;
}

export class OrderProduct {
    productId?: Nullable<Product>;
    productCount: number;
}

export class Order {
    _id: string;
    orderId: string;
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
    _id: string;
}

export class Product {
    _id: string;
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
    _id: string;
}

export class User {
    _id: string;
    name: string;
    email: string;
    role: string;
    image?: Nullable<string>;
    orders: Order[];
}

export abstract class IQuery {
    user?: Nullable<User>;
    users: User[];
}

type Nullable<T> = T | null;
