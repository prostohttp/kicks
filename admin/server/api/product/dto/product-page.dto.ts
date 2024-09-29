export interface ProductOptionDto {
  _id?: string;
  id: number;
  optionId: string;
  title: string;
  value?: string;
  type: string;
  sort: number | undefined;
  required: boolean;
  values?: {
    id: number;
    valueId: string;
    value: {
      value: string;
      label: string;
    };
    count?: number;
    price?: number;
  }[];
}

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
  options: ProductOptionDto[];
}