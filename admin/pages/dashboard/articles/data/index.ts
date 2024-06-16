import { eng } from "~/lang/eng";
import type { InputData } from "~/types/ui/ui.types";

export const articleData: InputData[] = [
  {
    label: eng.title,
    type: "text",
    name: "title",
    placeholder: eng.title,
  },
  {
    label: eng.shortDescription,
    name: "shortDescription",
    type: "textarea",
    placeholder: eng.shortDescription,
  },
  {
    label: eng.description,
    name: "description",
    type: "tiptap",
    placeholder: eng.description,
  },
  {
    label: eng.sort,
    name: "sort",
    type: "number",
    placeholder: eng.sort,
  },
  {
    label: eng.siteMenu,
    name: "siteMenu",
    type: "toggle",
    placeholder: eng.siteMenu,
  },
  {
    label: eng.adminMenu,
    name: "adminMenu",
    type: "toggle",
    placeholder: eng.adminMenu,
  },
  {
    label: eng.featuredProducts,
    name: "featuredProducts",
    type: "select",
    placeholder: eng.selectElement,
  },
  {
    label: eng.isEnabled,
    name: "isEnabled",
    type: "toggle",
    placeholder: eng.isEnabled,
  },
];
