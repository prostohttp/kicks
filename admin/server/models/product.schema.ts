import { defineMongooseModel } from "#nuxt/mongoose";
import { Types } from "mongoose";

export const Product = defineMongooseModel({
  name: "Product",
  schema: {
    title: {
      min: 3,
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    category: [
      {
        type: Types.ObjectId || String,
        required: false,
        ref: "Category",
      },
    ],
    options: [
      {
        optionId: {
          type: Types.ObjectId || String,
          required: true,
          ref: "Option",
        },
        values: [
          {
            valueId: {
              type: Types.ObjectId || String,
              required: true,
              ref: "OptionValue",
            },
            productCount: {
              type: Number,
              required: true,
              min: 1,
            },
          },
        ],
      },
    ],
    brand: {
      type: Types.ObjectId || String,
      required: false,
      ref: "Brand",
    },
    sku: {
      type: String,
      required: false,
    },
    quantity: {
      type: Number,
      required: false,
    },
    regularPrice: {
      type: Number,
      required: false,
    },
    salePrice: {
      type: Number,
      required: false,
    },
    tags: [
      {
        type: String,
        required: false,
      },
    ],
    image: {
      type: String,
      required: false,
    },
    additionImages: [
      {
        type: String,
        required: false,
      },
    ],
    isEnabled: {
      type: Boolean,
      required: true,
    },
  },
  hooks(schema) {
    schema.pre("save", function (this, next) {
      this.title = this.title.toString().trim() as any;
      this.regularPrice = 0 as any;
      if (Number(this.quantity) === 0 && !this.isEnabled) {
        this.isEnabled = false as any;
      }
      next();
    });
  },
});
