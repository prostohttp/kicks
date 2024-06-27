export interface OptionDto {
  _id: string;
  title: string;
  type: string;
  sort: number;
  values?: {
    id: number;
    value: string;
    sort: number;
    image: string;
  }[];
}
