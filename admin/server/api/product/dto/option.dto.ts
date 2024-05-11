import { OptionTypes } from "~/types/server/server.types";
export interface OptionDto {
  title: string;
  type: OptionTypes;
  values?: string;
  id?: string;
}
