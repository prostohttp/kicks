import { defineMongooseModel } from "#nuxt/mongoose";
import { Types } from "mongoose";

export const Filter = defineMongooseModel({
  name: "Filter",
  schema: {
    title: {
      min: 3,
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isEnabled: {
      type: Boolean,
      required: true,
    },
    options: {
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
