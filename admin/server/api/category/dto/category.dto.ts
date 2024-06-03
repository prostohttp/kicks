export interface CategoryDto {
  _id: string;
  title: string;
  description?: string;
  isParent?: boolean;
  children?: string;
  isEnabled?: boolean;
}
