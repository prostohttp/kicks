export interface OptionDto {
  _id: string;
  title: string;
  type: string;
  sort: number | undefined;
  values?: {
    id: number;
    value: string;
    sort: number | undefined;
    image: string;
  }[];
}
