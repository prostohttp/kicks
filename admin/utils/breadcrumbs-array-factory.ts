import type { BreadcrumbItem } from "~/types/ui/ui.types";
import { locale } from "~/lang/locale";

export default (
    data: string,
    title?: string,
    titleLink?: string,
): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [];
    const arrayFromData = data.split("/");
    for (const item of arrayFromData) {
        const lang = locale[useSettingsDataStore().locale];
        const label = lang.breadcrumbs[item as keyof typeof lang.breadcrumbs];
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
