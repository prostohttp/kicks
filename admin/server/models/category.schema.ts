import { defineMongooseModel } from "#nuxt/mongoose";
import { Types } from "mongoose";

export const Category = defineMongooseModel({
	name: "Category",
	schema: {
		title: {
			min: 3,
			unique: true,
			type: String,
			required: true,
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
		productCount: {
			type: Number,
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
	options: {
		collection: "categories",
	},
});
