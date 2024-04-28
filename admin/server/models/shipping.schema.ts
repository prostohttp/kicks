import { defineMongooseModel } from "#nuxt/mongoose";

export const Shipping = defineMongooseModel({
  name: "Shipping",
  schema: {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  hooks(schema) {
    schema.pre("save", function (this, next) {
      this.title = this.title.toString().trim() as any;
      next();
    });
  },
});
