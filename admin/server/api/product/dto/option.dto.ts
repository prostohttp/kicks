import { OptionTypes } from "#imports";

export interface OptionDto {
  title: string;
  type: OptionTypes;
  values?: string;
  id?: string;
}
