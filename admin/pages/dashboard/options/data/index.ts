import { eng } from "~/lang/eng";
import type { InputData } from "~/types/ui/ui.types";

export const optionData: InputData[] = [
  {
    label: eng.title,
    name: "title",
    type: "text",
    placeholder: eng.title,
  },
  {
    label: eng.type,
    name: "type",
    type: "select",
    placeholder: eng.typeText,
  },
  {
    label: eng.sort,
    name: "sort",
    type: "number",
    placeholder: eng.sort,
  },
];
