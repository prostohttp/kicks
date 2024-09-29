import { defineMongooseModel } from "#nuxt/mongoose";
import { Types } from "mongoose";

export const Option = defineMongooseModel({
  name: "Option",
  schema: {
    title: {
      min: 3,
      type: String,
      required: true,
    },
    type: {
      type: String,
      min: 3,
      required: true,
    },
    sort: {
      type: Number,
      required: true,
    },
    values: [
      {
        type: Types.ObjectId || String,
        required: false,
        ref: "OptionValue",
      },
    ],
  },
});
