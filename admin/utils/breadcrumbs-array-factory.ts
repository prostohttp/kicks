import type { BreadcrumbItem } from "~/types/ui/ui.types";
import { eng } from "~/lang/eng";

export default (
  data: string,
  title?: string,
  titleLink?: string,
): BreadcrumbItem[] => {
  const items: BreadcrumbItem[] = [];
  const arrayFromData = data.split("/");
  for (const item of arrayFromData) {
    const label = eng.breadcrumbs[item as keyof typeof eng.breadcrumbs];
    if (item !== "" && label) {
      items.push({
        label,
        to: getPathFromArray(arrayFromData, item),
      });
    }
  }

  if (title && titleLink) {
    items.push({
      label: title,
      to: titleLink,
    });
  }

  return items;
};
