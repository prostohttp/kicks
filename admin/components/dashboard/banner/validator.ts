import type { FormError } from "#ui/types";
import { Constants } from "~/constants";
import { eng } from "~/lang/eng";
import type { BannerDto } from "~/server/api/banner/dto/banner.dto";

export const validate = (state: BannerDto): FormError[] => {
  const errors = [];
  if (!state.title) errors.push({ path: "title", message: eng.error.string });

  if (!state.banners.length)
    errors.push({ path: "banners", message: eng.addNewBanner });

  if (state.title.length < Constants.STRING_MIN_LENGTH) {
    errors.push({ path: "title", message: eng.error.stringMin });
  }

  for (const item of state.banners) {
    if (!item.sort) {
      errors.push({ path: `sort${item.id}`, message: eng.error.number });
    }
    if (item.sort! < Constants.NUMBER_MIN_VALUE) {
      errors.push({ path: `sort${item.id}`, message: eng.error.numberMin });
    }
    if (!item.image) {
      errors.push({ path: `image${item.id}`, message: eng.error.required });
    }
  }

  return errors;
};
