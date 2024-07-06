import type { OptionDto } from "~/server/api/option/dto/option.dto";
import type { ValueOption } from "~/types/server/server.types";

export default (option: OptionDto): ValueOption => {
  const values: ValueOption = {};
  if (option.values && option.values.length) {
    Object.values(option.values).forEach((opt) => {
      values![opt.id] = {
        id: opt.id,
        value: opt.value,
        sort: opt.sort,
        image: opt.image,
      };
    });
  }
  return values;
};
