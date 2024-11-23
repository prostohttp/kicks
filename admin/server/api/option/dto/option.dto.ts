import { ExtendedOptionValueDto } from "../../option-value/dto/option-value.dto";

export interface BaseOptionDto {
    _id?: string;
    title: string;
    value?: string;
    type: string;
    sort: number;
    required?: boolean;
}
export interface OptionDto extends BaseOptionDto {
    values?: string[];
}

export interface OptionDtoWithValues extends BaseOptionDto {
    values?: ExtendedOptionValueDto[];
}
