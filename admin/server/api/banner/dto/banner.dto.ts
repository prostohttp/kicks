export interface IBanner {
    _id?: string;
    id: number;
    heading?: string;
    description?: string;
    image: string;
    url?: string;
    sort: number | undefined;
}

export interface BannerDto {
    _id?: string;
    title: string;
    banners: IBanner[];
}
