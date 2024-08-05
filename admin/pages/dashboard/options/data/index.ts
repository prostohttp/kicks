import { locale } from "~/lang/locale";
import type { InputData } from "~/types/ui/ui.types";

export const optionData: InputData[] = [
  {
    label: locale[useSettingsDataStore().locale].title,
    name: "title",
    type: "text",
    placeholder: locale[useSettingsDataStore().locale].title,
  },
  {
    label: locale[useSettingsDataStore().locale].type,
    name: "type",
    type: "select",
    placeholder: locale[useSettingsDataStore().locale].typeText,
  },
  {
    label: locale[useSettingsDataStore().locale].sort,
    name: "sort",
    type: "number",
    placeholder: locale[useSettingsDataStore().locale].sort,
  },
];
