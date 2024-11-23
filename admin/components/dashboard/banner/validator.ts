import type { FormError } from "#ui/types";
import { Constants } from "~/constants";
import { locale } from "~/lang/locale";
import type { BannerDto } from "~/server/api/banner/dto/banner.dto";

export const validate = (state: BannerDto): FormError[] => {
    const errors = [];
    if (!state.title) {
        errors.push({
            path: "title",
            message: locale[useSettingsDataStore().locale].error.string,
        });
    }

    if (!state.banners.length) {
        errors.push({
            path: "banners",
            message:
                locale[useSettingsDataStore().locale].error.needOneMoreItem,
        });
    }

    if (state.title.length < Constants.STRING_MIN_LENGTH) {
        errors.push({
            path: "title",
            message: locale[useSettingsDataStore().locale].error.stringMin,
        });
    }

    for (const item of state.banners) {
        if (!item.sort) {
            errors.push({
                path: `sort${item.id}`,
                message: locale[useSettingsDataStore().locale].error.number,
            });
        }
        if (item.sort! < Constants.NUMBER_MIN_VALUE) {
            errors.push({
                path: `sort${item.id}`,
                message: locale[useSettingsDataStore().locale].error.numberMin,
            });
        }
        if (!item.image) {
            errors.push({
                path: `image${item.id}`,
                message: locale[useSettingsDataStore().locale].error.required,
            });
        }
    }

    return errors;
};
