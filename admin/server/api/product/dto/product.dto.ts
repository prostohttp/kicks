import { OptionDtoWithValues } from "~/server/api/option/dto/option.dto";

export interface ProductDto {
  _id?: string;
  title: string;
  shortDescription: string;
  description?: string;
  category?: string[];
  brand?: string;
  sku?: string;
  quantity: number;
  regularPrice: number;
  salePrice?: number;
  tags?: string[];
  image?: string;
  additionImages: string[];
  isEnabled: {
    label: string;
    value: boolean;
  };
  options?: OptionDtoWithValues[];
}
