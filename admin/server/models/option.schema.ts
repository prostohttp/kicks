import { defineMongooseModel } from "#nuxt/mongoose";
import { Types } from "mongoose";

export const Option = defineMongooseModel({
    name: "Option",
    schema: {
        title: {
            min: 3,
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: false,
        },
        type: {
            type: String,
            min: 3,
            required: true,
        },
        sort: {
            type: Number,
            required: true,
        },
        required: {
            type: Boolean,
            required: false,
        },
        values: [
            {
                type: Types.ObjectId,
                required: false,
                ref: "OptionValue",
            },
        ],
    },
});
