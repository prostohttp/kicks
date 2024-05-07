import { OptionTypes } from "#imports";
import { OptionValueDto } from "./option-value.dto";

export interface OptionDto {
  title: string;
  type: OptionTypes;
  values?: OptionValueDto[];
  id?: string;
}
