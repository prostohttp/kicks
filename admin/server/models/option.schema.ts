import { defineMongooseModel } from "#nuxt/mongoose";
import { Types } from "mongoose";
import { OptionTypes } from "~/types";

export const Option = defineMongooseModel({
	name: "Option",
	schema: {
		title: {
			min: 3,
			type: String,
			required: true,
		},
		type: {
			type: String,
			enum: Object.values(OptionTypes),
			required: true,
		},
		values: [
			{
				type: Types.ObjectId || String,
				required: true,
				ref: "OptionValue",
			},
		],
	},
	hooks(schema) {
		schema.pre("save", function (this, next) {
			this.title = this.title.toString().trim() as any;
			next();
		});
	},
});
