export interface OptionDto {
  _id: string;
  id: number;
  title: string;
  type: string;
  required: boolean;
  sort: number | undefined;
  optionId: string;
  values?: {
    _id: string;
    id: number;
    value: string;
    valueId: string;
    sort: number | undefined;
    image: string;
  }[];
}
