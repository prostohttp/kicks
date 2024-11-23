import { defineMongooseModel } from "#nuxt/mongoose";

export const Shipping = defineMongooseModel({
    name: "Shipping",
    schema: {
        title: {
            type: String,
            required: true,
            min: 3,
            unique: true,
        },
        description: {
            type: String,
            required: false,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    hooks(schema) {
        schema.pre("save", function (this, next) {
            this.title = this.title.toString().trim() as any;
            next();
        });
    },
});
