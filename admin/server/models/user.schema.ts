import { defineMongooseModel } from "#nuxt/mongoose";
import { Types } from "mongoose";
import { Roles } from "~/types/server/server.types";

export const User = defineMongooseModel({
    name: "User",
    schema: {
        name: {
            min: 3,
            type: String,
            required: true,
        },
        email: {
            type: String,
            min: 3,
            unique: true,
            required: true,
        },
        password: {
            min: 6,
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: Object.values(Roles),
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
        // Только для покупателей
        address: {
            type: String,
            required: false,
        },
        orders: [
            {
                type: Types.ObjectId || String,
                required: false,
                ref: "Order",
            },
        ],
    },
});
