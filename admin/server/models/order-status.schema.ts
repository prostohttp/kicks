import { defineMongooseModel } from "#nuxt/mongoose";

export const OrderStatus = defineMongooseModel({
    name: "OrderStatus",
    schema: {
        ru: {
            type: String,
            require: true,
        },
        en: {
            type: String,
            require: true,
        },
    },
    options: {
        collection: "orderstatuses",
    },
});
