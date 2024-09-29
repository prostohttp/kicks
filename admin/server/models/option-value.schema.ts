import { defineMongooseModel } from "#nuxt/mongoose";

export const OptionValue = defineMongooseModel({
  name: "OptionValue",
  schema: {
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
