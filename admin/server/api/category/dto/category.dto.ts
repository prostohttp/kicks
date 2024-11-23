export interface PopulateChildCategory {
    _id: string;
    title: string;
}
export interface CategoryDto {
    _id: string;
    title: string;
    description?: string;
    isParent: boolean;
    children: PopulateChildCategory[];
    isEnabled: boolean;
}
