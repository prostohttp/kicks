import type { FormError } from "#ui/types";
import { Constants } from "~/constants";
import { locale } from "~/lang/locale";
import type { OptionDtoWithValues } from "~/server/api/option/dto/option.dto";

export const validate = (state: OptionDtoWithValues): FormError[] => {
    const errors = [];
    if (!state.title) {
        errors.push({
            path: "title",
            message: locale[useSettingsDataStore().locale].error.string,
        });
    }
    if (state.title.length < Constants.STRING_MIN_LENGTH) {
        errors.push({
            path: "title",
            message: locale[useSettingsDataStore().locale].error.stringMin,
        });
    }
    if (!state.sort) {
        errors.push({
            path: "sort",
            message: locale[useSettingsDataStore().locale].error.number,
        });
    }
    if (state.sort! < Constants.NUMBER_MIN_VALUE) {
        errors.push({
            path: "sort",
            message: locale[useSettingsDataStore().locale].error.numberMin,
        });
    }
    if (!state.type) {
        errors.push({
            path: "type",
            message: locale[useSettingsDataStore().locale].error.string,
        });
    }
    for (const item of state.values!) {
        if (!item.value.label) {
            errors.push({
                path: `value${item._id}`,
                message: locale[useSettingsDataStore().locale].error.string,
            });
        }
        if (item.value.label.length < Constants.STRING_MIN_LENGTH) {
            errors.push({
                path: `value${item._id}`,
                message: locale[useSettingsDataStore().locale].error.stringMin,
            });
        }
        if (!item.sort) {
            errors.push({
                path: `sort${item._id}`,
                message: locale[useSettingsDataStore().locale].error.number,
            });
        }
        if (item.sort! < Constants.NUMBER_MIN_VALUE) {
            errors.push({
                path: `sort${item._id}`,
                message: locale[useSettingsDataStore().locale].error.numberMin,
            });
        }
    }
    return errors;
};
