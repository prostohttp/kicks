import { defineMongooseModel } from "#nuxt/mongoose";
import { Types } from "mongoose";

export const OptionValue = defineMongooseModel({
  name: "OptionValue",
  schema: {
    value: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    parentOption: {
      type: Types.ObjectId || String,
      required: true,
      ref: "Option",
    },
    sort: {
      type: Number,
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
    deduct: {
      type: Boolean,
      required: false,
    },
  },
  hooks(schema) {
    schema.pre("save", function (this, next) {
      this.value = this.value!.toString().trim() as any;
      next();
    });
  },
});
