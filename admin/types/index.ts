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

export interface MultiPartData {
	data: Buffer;
	name?: string;
	filename?: string;
	type?: string;
}
