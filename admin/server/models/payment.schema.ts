import { defineMongooseModel } from "#nuxt/mongoose";

export const Payment = defineMongooseModel({
  name: "Payment",
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
