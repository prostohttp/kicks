import { BaseOptionDto } from "~/server/api/option/dto/option.dto";
import { ExtendedOptionValueDto } from "../../option-value/dto/option-value.dto";

export interface ProductOptionDto {
    optionValue: Omit<BaseOptionDto, "sort">;
    required: boolean;
    value?: string;
    sort: number;
    values?: {
        optionValue: ExtendedOptionValueDto;
        price?: number;
        count?: number;
    }[];
}
export interface ProductDto {
    _id?: string;
    title: string;
    shortDescription: string;
    description?: string;
    category?: {
        _id: string;
        title: string;
    }[];
    brand?: {
        _id: string;
        title: string;
    };
    sku?: string;
    quantity: number;
    regularPrice: number;
    salePrice?: number;
    tags?: string[];
    image?: string;
    additionImages?: string[];
    isEnabled: {
        label: string;
        value: boolean;
    };
    options: ProductOptionDto[];
}

type FlatProductDtoType = Omit<ProductDto, "category" | "brand">;

export interface FlatProductDto extends FlatProductDtoType {
    category: string[];
    brand: string;
}
