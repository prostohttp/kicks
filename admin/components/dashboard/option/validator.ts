import type { FormError } from "#ui/types";
import { Constants } from "~/constants";
import { eng } from "~/lang/eng";

export const validate = (state: UiOptionDto): FormError[] => {
  const errors = [];
  if (!state.title) {
    errors.push({ path: "title", message: eng.error.string });
  }
  if (state.title.length < Constants.STRING_MIN_LENGTH) {
    errors.push({ path: "title", message: eng.error.stringMin });
  }
  if (!state.sort) {
    errors.push({ path: "sort", message: eng.error.number });
  }
  if (state.sort! < Constants.NUMBER_MIN_VALUE) {
    errors.push({ path: "sort", message: eng.error.numberMin });
  }
  if (!state.type) {
    errors.push({ path: "type", message: eng.error.string });
  }
  for (const item of state.values) {
    if (!item.value) {
      errors.push({ path: `value${item.id}`, message: eng.error.string });
    }
    if (item.value.length < Constants.STRING_MIN_LENGTH) {
      errors.push({ path: `value${item.id}`, message: eng.error.stringMin });
    }
    if (!item.sort) {
      errors.push({ path: `sort${item.id}`, message: eng.error.number });
    }
    if (item.sort! < Constants.NUMBER_MIN_VALUE) {
      errors.push({ path: `sort${item.id}`, message: eng.error.numberMin });
    }
  }
  return errors;
};
