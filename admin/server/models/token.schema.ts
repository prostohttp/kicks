import { defineMongooseModel } from "#nuxt/mongoose";

export const Token = defineMongooseModel({
	name: "Token",
	schema: {
		token: {
			type: String,
			required: true,
		},
		timestamp: {
			type: String,
			required: true,
		},
		password: {
			min: 6,
			type: String,
			required: true,
		},
	},
});
