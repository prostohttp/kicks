import { type ObjectId } from "mongoose";

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

export enum Roles {
	USER = "user",
	MANAGER = "manager",
	ADMIN = "admin",
}

export enum OrderStatus {
	SOLD = "sold",
	PROCESSING = "processing",
	DELIVERED = "delivered",
	CANCELLED = "cancelled",
}

export interface MultiPartData {
	data: Buffer;
	name?: string;
	filename?: string;
	type?: string;
}

export interface CategoryDto {
	_id: ObjectId | string;
	title: string;
	description: string;
	isParent: boolean;
	children: [string];
	productCount: number;
	image: string;
	isEnabled: boolean;
}

export interface CategoryResponseDto {
	categories: Partial<CategoryDto>[];
	pagesInPagination: number;
	activePage: number;
}
