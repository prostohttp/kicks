import { defineMongooseModel } from "#nuxt/mongoose";

export const Option = defineMongooseModel({
  name: "Option",
  schema: {
    title: {
      min: 3,
      type: String,
      required: true,
      unique: true,
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
        valueTitle: {
          type: String,
          required: true,
        },
        valueSort: {
          type: Number,
          required: true,
        },
        valueimage: {
          type: String,
          required: false,
        },
      },
    ],
  },
  hooks(schema) {
    schema.pre("save", function (this, next) {
      this.title = this.title.toString().toLowerCase().trim() as any;
      next();
    });
  },
});
