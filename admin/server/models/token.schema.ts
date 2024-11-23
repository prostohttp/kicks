import { defineMongooseModel } from "#nuxt/mongoose";

export const Token = defineMongooseModel({
    name: "Token",
    schema: {
        token: {
            type: String,
            required: true,
        },
        timestamp: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
});
