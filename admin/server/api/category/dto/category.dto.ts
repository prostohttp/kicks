export interface CategoryDto {
  id?: string;
  title: string;
  description?: string;
  isParent: boolean;
  children?: string;
  productCount?: number;
  image?: string;
  isEnabled?: boolean;
}
