export interface UserProfileDto {
    id?: string;
    name: string;
    email: string;
    password?: string;
    confirm?: string;
    image?: string;
    role?: string;
}
