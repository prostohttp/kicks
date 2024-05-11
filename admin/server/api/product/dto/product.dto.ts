import { OptionDto } from "./option.dto";

export interface ProductDto {
  id?: string;
  title: string;
  description?: string;
  category?: string;
  brand?: string;
  sku?: string;
  quantity?: number;
  regularPrice?: number;
  salePrice?: number;
  tags?: string;
  image?: string;
  additionImages?: string[];
  isEnabled: boolean;
  options: OptionDto[];
}
