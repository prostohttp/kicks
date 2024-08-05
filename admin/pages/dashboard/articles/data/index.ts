import { locale } from "~/lang/locale";
import type { InputData } from "~/types/ui/ui.types";

export const articleData: InputData[] = [
  {
    label: locale[useSettingsDataStore().locale].title,
    type: "text",
    name: "title",
    placeholder: locale[useSettingsDataStore().locale].title,
  },
  {
    label: locale[useSettingsDataStore().locale].shortDescription,
    name: "shortDescription",
    type: "textarea",
    placeholder: locale[useSettingsDataStore().locale].shortDescription,
  },
  {
    label: locale[useSettingsDataStore().locale].description,
    name: "description",
    type: "tiptap",
    placeholder: locale[useSettingsDataStore().locale].description,
  },
  {
    label: locale[useSettingsDataStore().locale].sort,
    name: "sort",
    type: "number",
    placeholder: locale[useSettingsDataStore().locale].sort,
  },
  {
    label: locale[useSettingsDataStore().locale].siteMenu,
    name: "siteMenu",
    type: "toggle",
    placeholder: locale[useSettingsDataStore().locale].siteMenu,
  },
  {
    label: locale[useSettingsDataStore().locale].adminMenu,
    name: "adminMenu",
    type: "toggle",
    placeholder: locale[useSettingsDataStore().locale].adminMenu,
  },
  {
    label: locale[useSettingsDataStore().locale].featuredProducts,
    name: "featuredProducts",
    type: "select",
    placeholder: locale[useSettingsDataStore().locale].selectElement,
  },
  {
    label: locale[useSettingsDataStore().locale].isEnabled,
    name: "isEnabled",
    type: "toggle",
    placeholder: locale[useSettingsDataStore().locale].isEnabled,
  },
];
