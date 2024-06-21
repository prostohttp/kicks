export interface OptionDto {
  _id: string;
  title: string;
  type: string;
  sort: number;
  values?: {
    title: string;
    sort: string;
    image?: string;
  }[];
}
