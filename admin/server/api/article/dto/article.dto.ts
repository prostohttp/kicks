export interface FeaturedProducts {
    _id: string;
    title: string;
}

export interface ArticleDto {
    _id: string;
    title: string;
    shortDescription: string;
    description: string;
    isEnabled: boolean;
    featuredProducts?: FeaturedProducts[];
    image?: string;
    adminMenu?: boolean;
    siteMenu?: boolean;
    createdAt: string;
    sort: string;
}
