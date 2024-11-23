export interface UserEditDto {
    id: string;
    name: string;
    email: string;
    image?: string;
    oldPassword?: string;
    newPassword?: string;
    role?: string;
}
