export interface BannerDto {
  _id: string;
  title: string;
  banners: {
    heading?: string;
    description?: string;
    image: string;
    url?: string;
  }[];
}
