export interface ArticleDto {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  isEnabled: boolean;
  featuredProducts?: string;
  image?: string;
  adminMenu?: boolean;
  siteMenu?: boolean;
  createdAt: string;
  sort?: string;
}
