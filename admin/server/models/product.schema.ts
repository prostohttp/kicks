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
    shortDescription: {
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
        value: {
          type: String,
          required: false,
        },
        optionId: {
          type: Types.ObjectId || String,
          required: true,
          ref: "Option",
        },
        sort: {
          type: Number,
          required: true,
        },
        required: {
          type: Boolean,
          required: true,
        },
        values: [
          {
            value: {
              type: String,
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
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
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
      label: {
        type: String,
        required: true,
      },
      value: {
        type: Boolean,
        required: true,
      },
    },
    createdAt: {
      type: Date,
      required: true,
    },
  },
});
