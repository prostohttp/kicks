export interface RegisterFormDto {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	terms: boolean;
	keepLogged: boolean;
}

export interface LoginFormDto {
	email: string;
	password: string;
	keepLogged: boolean;
}

export interface ForgotFormDto {
	email: string;
}

export enum Roles {
	USER = "user",
	MANAGER = "manager",
	ADMIN = "admin",
}
