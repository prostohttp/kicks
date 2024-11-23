import { Types } from "mongoose";
import { defineMongooseModel } from "#nuxt/mongoose";

export const Settings = defineMongooseModel({
    name: "Settings",
    schema: {
        image: {
            type: String,
            required: true,
        },
        localeDashboard: {
            value: {
                type: String,
                enum: Object.values(Locales),
                required: true,
            },
            label: {
                type: String,
                required: true,
            },
        },
        localeStore: {
            value: {
                type: String,
                enum: Object.values(Locales),
                required: true,
            },
            label: {
                type: String,
                required: true,
            },
        },
        currency: {
            value: {
                type: String,
                enum: Object.values(Currency),
                required: true,
            },
            label: {
                type: String,
                required: true,
            },
        },
        mainCurrency: {
            value: {
                type: String,
                enum: Object.values(Currency),
                required: true,
            },
            label: {
                type: String,
                required: true,
            },
        },
        secondCurrencyRate: {
            type: Number,
            required: true,
        },
        startOrderStatus: {
            type: Types.ObjectId || String,
            required: true,
            ref: "OrderStatus",
        },
        endOrderStatus: {
            type: Types.ObjectId || String,
            required: true,
            ref: "OrderStatus",
        },
        en: {
            title: {
                min: 3,
                type: String,
                required: true,
            },
            phone: {
                type: String,
                required: true,
            },
            description: {
                min: 10,
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: false,
            },
        },
        ru: {
            title: {
                min: 3,
                type: String,
                required: true,
            },
            phone: {
                type: String,
                required: true,
            },
            description: {
                min: 10,
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: false,
            },
        },
    },
    options: {
        collection: "settings",
    },
});
