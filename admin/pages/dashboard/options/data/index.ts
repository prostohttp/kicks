import { locale } from "~/lang/locale";
import type { InputData } from "~/types/ui/ui.types";

export const optionData: InputData[] = [
  {
    label: locale["en"].title,
    name: "title",
    type: "text",
    placeholder: locale["en"].title,
  },
  {
    label: locale["en"].type,
    name: "type",
    type: "select",
    placeholder: locale["en"].typeText,
  },
  {
    label: locale["en"].sort,
    name: "sort",
    type: "number",
    placeholder: locale["en"].sort,
  },
];
