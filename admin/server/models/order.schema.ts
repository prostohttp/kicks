import { defineMongooseModel } from "#nuxt/mongoose";
import { Types } from "mongoose";
import { OrderStatus } from "~/types/server/server.types";

export const Order = defineMongooseModel({
  name: "Order",
  schema: {
    orderId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: Types.ObjectId || String,
          ref: "Product",
          required: true,
        },
        productCount: {
          type: Number,
          min: 1,
          required: true,
        },
      },
    ],
    customer: {
      type: Types.ObjectId || String,
      required: true,
      ref: "User",
    },
    shipping: {
      type: Types.ObjectId || String,
      required: true,
      ref: "Shipping",
    },
    shippingAddress: {
      type: String,
      required: false,
    },
    payment: {
      type: Types.ObjectId || String,
      required: true,
      ref: "Payment",
    },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    note: {
      type: String,
      required: false,
    },
  },
});
