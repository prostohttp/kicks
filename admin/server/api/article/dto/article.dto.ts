export interface ArticleDto {
  _id: string;
  id?: string;
  title: string;
  shortDescription?: string;
  description: string;
  isEnabled: boolean;
  featuredProducts?: string;
  image?: string;
}
