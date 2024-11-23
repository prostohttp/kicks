import { defineMongooseModel } from "#nuxt/mongoose";

export const Information = defineMongooseModel({
    name: "Information",
    schema: {
        title: {
            min: 3,
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        image: {
            type: String,
            required: false,
        },
        isEnabled: {
            type: Boolean,
            required: false,
        },
    },
    hooks(schema) {
        schema.pre("save", function (this, next) {
            this.title = this.title.toString().trim() as any;
            this.isEnabled = true as any;
            next();
        });
    },
});
