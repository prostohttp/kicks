export interface OptionValueDto {
    _id?: string;
    value: string;
    sort: number;
    image: string;
}
export interface ExtendedOptionValueDto {
    _id?: string;
    value: {
        value: string;
        label: string;
    };
    sort: number;
    image?: string;
    new?: boolean;
}
