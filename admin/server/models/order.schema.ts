import { defineMongooseModel } from "#nuxt/mongoose";
import { Types } from "mongoose";

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
            type: Types.ObjectId || String,
            required: true,
            ref: "OrderStatus",
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
