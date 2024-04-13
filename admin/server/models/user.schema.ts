import { defineMongooseModel } from "#nuxt/mongoose";
import { Roles } from "~/types";

export const User = defineMongooseModel({
	name: "User",
	schema: {
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: Object.values(Roles),
		},
	},
});
