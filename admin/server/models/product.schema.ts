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
                type: Types.ObjectId,
                required: false,
                ref: "Category",
            },
        ],
        options: [
            {
                optionValue: {
                    type: Types.ObjectId,
                    required: true,
                    ref: "Option",
                },
                value: {
                    type: String,
                    required: false,
                },
                required: {
                    type: Boolean,
                    required: true,
                },
                sort: {
                    type: Number,
                    required: true,
                },
                values: [
                    {
                        type: {
                            optionValue: {
                                type: Types.ObjectId,
                                required: false,
                                ref: "OptionValue",
                            },
                            price: {
                                type: Number,
                                required: false,
                            },
                            count: {
                                type: Number,
                                required: false,
                            },
                        },
                        required: false,
                    },
                ],
            },
        ],
        brand: {
            type: Types.ObjectId,
            required: false,
            ref: "Brand",
        },
        sku: {
            type: String,
            min: 3,
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
