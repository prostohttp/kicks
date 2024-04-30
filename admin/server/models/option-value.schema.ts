import { defineMongooseModel } from "#nuxt/mongoose";
import { Types } from "mongoose";

export const OptionValue = defineMongooseModel({
  name: "OptionValue",
  schema: {
    title: {
      min: 3,
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    value: {
      type: String,
      required: false,
    },
    parentOption: {
      type: Types.ObjectId || String,
      required: true,
      ref: "Option",
    },
  },
  hooks(schema) {
    schema.pre("save", function (this, next) {
      this.title = this.title.toString().trim() as any;
      next();
    });
  },
});
