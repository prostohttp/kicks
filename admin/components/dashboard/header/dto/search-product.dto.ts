export interface SearchProductDto {
  _id: string;
  title: string;
  description?: string;
  regularPrice: number;
  salePrice?: number;
  image?: string;
}
