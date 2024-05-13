export interface UserDto {
  id?: string;
  name: string;
  email: string;
  password?: string;
  image?: string;
  role?: string;
  isRegistered?: boolean;
}
