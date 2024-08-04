import { locale } from "~/lang/locale";
import type { InputData } from "~/types/ui/ui.types";

export const articleData: InputData[] = [
  {
    label: locale["en"].title,
    type: "text",
    name: "title",
    placeholder: locale["en"].title,
  },
  {
    label: locale["en"].shortDescription,
    name: "shortDescription",
    type: "textarea",
    placeholder: locale["en"].shortDescription,
  },
  {
    label: locale["en"].description,
    name: "description",
    type: "tiptap",
    placeholder: locale["en"].description,
  },
  {
    label: locale["en"].sort,
    name: "sort",
    type: "number",
    placeholder: locale["en"].sort,
  },
  {
    label: locale["en"].siteMenu,
    name: "siteMenu",
    type: "toggle",
    placeholder: locale["en"].siteMenu,
  },
  {
    label: locale["en"].adminMenu,
    name: "adminMenu",
    type: "toggle",
    placeholder: locale["en"].adminMenu,
  },
  {
    label: locale["en"].featuredProducts,
    name: "featuredProducts",
    type: "select",
    placeholder: locale["en"].selectElement,
  },
  {
    label: locale["en"].isEnabled,
    name: "isEnabled",
    type: "toggle",
    placeholder: locale["en"].isEnabled,
  },
];
