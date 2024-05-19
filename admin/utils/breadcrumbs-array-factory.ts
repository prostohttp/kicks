import type { BreadcrumbItem } from "~/types/ui/ui.types";
import { eng } from "~/lang/eng";

export default (data: string): BreadcrumbItem[] => {
  const items: BreadcrumbItem[] = [];
  const arrayFromData = data.split("/");
  for (const item of arrayFromData) {
    const label = eng.breadcrumbs[item as keyof typeof eng.breadcrumbs];
    if (item !== "") {
      items.push({
        label,
        to: getPathFromArray(arrayFromData, item),
      });
    }
  }

  return items;
};
