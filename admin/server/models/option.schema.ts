import { defineMongooseModel } from "#nuxt/mongoose";

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
      required: true,
    },
    sort: {
      type: Number,
      required: true,
    },
    values: [
      {
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
    ],
  },
});
