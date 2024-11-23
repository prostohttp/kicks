export interface UserEditDto {
    id?: string;
    name: string;
    email: string;
    oldPassword?: string;
    newPassword?: string;
    image?: string;
    role?: string;
    isRegistered?: boolean;
}
