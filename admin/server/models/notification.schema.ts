import { defineMongooseModel } from "#nuxt/mongoose";
import { Types } from "mongoose";

export const Notification = defineMongooseModel({
    name: "Notification",
    schema: {
        order: {
            type: Types.ObjectId || String,
            required: true,
            ref: "Order",
        },
        isRead: {
            type: Boolean,
            required: true,
        },
        createdAt: {
            type: Date,
            required: true,
        },
    },
});
