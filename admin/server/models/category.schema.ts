import { defineMongooseModel } from "#nuxt/mongoose";
import { Types } from "mongoose";

export const Category = defineMongooseModel({
    name: "Category",
    schema: {
        title: {
            min: 3,
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
        isParent: {
            type: Boolean,
            required: true,
        },
        children: [
            {
                type: Types.ObjectId || String,
                required: false,
                ref: "Category",
            },
        ],
        isEnabled: {
            type: Boolean,
            required: true,
        },
    },
    hooks(schema) {
        schema.pre("save", function (this, next) {
            this.title = this.title.toString().trim() as any;
            next();
        });
    },
    options: {
        collection: "categories",
    },
});
