import { OptionValueDto } from "../../option-value/dto/option-value.dto";

export interface OptionDto {
  _id?: string;
  title: string;
  type: string;
  sort: number | undefined;
  values?: string[];
}

export interface OptionDtoWithValues {
  _id?: string;
  title: string;
  type: string;
  sort: number;
  values?: OptionValueDto[];
}
