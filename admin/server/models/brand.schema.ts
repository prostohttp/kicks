import { defineMongooseModel } from "#nuxt/mongoose";

export const Brand = defineMongooseModel({
	name: "Brand",
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
	},
	hooks(schema) {
		schema.pre("save", function (this, next) {
			this.title = this.title.toString().trim() as any;
			next();
		});
	},
});
