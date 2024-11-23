import { defineMongooseModel } from "#nuxt/mongoose";

export const Payment = defineMongooseModel({
    name: "Payment",
    schema: {
        title: {
            type: String,
            required: true,
            min: 3,
            unique: true,
        },
    },
    hooks(schema) {
        schema.pre("save", function (this, next) {
            this.title = this.title.toString().trim() as any;
            next();
        });
    },
});
