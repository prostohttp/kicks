import { defineMongooseModel } from "#nuxt/mongoose";

export const Brand = defineMongooseModel({
    name: "Brand",
    schema: {
        title: {
            min: 3,
            type: String,
            required: true,
            index: true,
        },
        description: {
            type: String,
            required: false,
        },
        image: {
            type: String,
            required: false,
        },
    },
});
