import { defineMongooseModel } from "#nuxt/mongoose";
// import { Types } from "mongoose";

export const OptionValue = defineMongooseModel({
  name: "OptionValue",
  schema: {
    value: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
  },
});
