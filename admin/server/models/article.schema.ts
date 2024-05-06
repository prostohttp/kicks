import {defineMongooseModel} from "#nuxt/mongoose";
import {Types} from "mongoose";

export const Article = defineMongooseModel({
  name: "Article",
  schema: {
    title: {
      min: 3,
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    isEnabled: {
      type: Boolean,
      required: true,
    },
    featuredProducts: [
      {type: Types.ObjectId || String, required: false, ref: "Product"},
    ],
    image: {
      type: String,
      required: false,
    },
  },
  hooks(schema) {
    schema.pre("save", function (this, next) {
      this.title = this.title.toString().trim() as any;
      next();
    });
  },
});
