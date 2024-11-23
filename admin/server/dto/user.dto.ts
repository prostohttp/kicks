export interface UserDto {
    _id: string;
    id?: string;
    name: string;
    email: string;
    password?: string;
    image?: string;
    role?: string;
    isRegistered?: boolean;
}
