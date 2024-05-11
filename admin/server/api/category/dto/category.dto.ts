export interface CategoryDto {
  _id: string;
  id?: string;
  title: string;
  description?: string;
  isParent?: boolean;
  children?: string;
  image?: string;
  isEnabled?: boolean;
}
