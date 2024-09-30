export interface OptionValueDto {
  _id?: string;
  value: string;
  sort: number;
  image: string;
}

export interface ExtendedOptionValueDto extends OptionValueDto {
  new?: boolean;
}
