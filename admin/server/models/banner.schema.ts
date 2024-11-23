import { defineMongooseModel } from "#nuxt/mongoose";

export const Banner = defineMongooseModel({
    name: "Banner",
    schema: {
        title: {
            min: 3,
            type: String,
            required: true,
        },
        banners: [
            {
                id: {
                    type: Number,
                    requred: true,
                },
                heading: {
                    type: String,
                    required: false,
                },
                description: {
                    type: String,
                    required: false,
                },
                image: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: false,
                },
                sort: {
                    type: Number,
                    required: true,
                },
            },
        ],
    },
});
