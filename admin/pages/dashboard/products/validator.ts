import type { FormError } from "#ui/types";
import { locale } from "~/lang/locale";
import type { ProductDto } from "~/server/api/product/dto/product.dto";

export const validate = (state: ProductDto): FormError[] => {
  const errors = [];

  if (!state.title || state.title.length < 3) {
    errors.push({
      path: "title",
      message: locale[useSettingsDataStore().locale].error.stringMin3,
    });
  }

  if ((!state.quantity && state.quantity !== 0) || state.quantity < 0) {
    errors.push({
      path: "quantity",
      message: locale[useSettingsDataStore().locale].error.required,
    });
  }

  if (!state.regularPrice || state.regularPrice <= 0) {
    errors.push({
      path: "regularPrice",
      message: locale[useSettingsDataStore().locale].error.required,
    });
  }

  if (state.salePrice && state.salePrice <= 0) {
    errors.push({
      path: "salePrice",
      message: locale[useSettingsDataStore().locale].error.notZero,
    });
  }

  if (!state.isEnabled || typeof state.isEnabled.value !== "boolean") {
    errors.push({
      path: "isEnabled",
      message: locale[useSettingsDataStore().locale].error.required,
    });
  }
  return errors;
};
