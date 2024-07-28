export interface IBanner {
  id: number;
  heading?: string;
  description?: string;
  image: string;
  url?: string;
  sort: number | undefined;
}

export interface BannerDto {
  id: string;
  title: string;
  banners: IBanner[];
}
