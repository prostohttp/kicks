import { defineMongooseModel } from "#nuxt/mongoose";
import { Types } from "mongoose";

export const OptionValue = defineMongooseModel({
  name: "OptionValue",
  schema: {
    optionId: {
      type: Types.ObjectId || String,
      required: false,
      ref: "Option",
    },
    value: {
      type: String,
      required: true,
    },
    sort: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
});
