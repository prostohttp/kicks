import { defineMongooseModel } from "#nuxt/mongoose";
import { Types } from "mongoose";
import { OrderStatus } from "~/types";

export const Order = defineMongooseModel({
	name: "Order",
	schema: {
		orderId: {
			type: String,
			required: true,
			unique: true,
		},
		title: {
			min: 3,
			type: String,
			required: true,
		},
		products: [
			{
				type: Types.ObjectId || String,
				ref: "Product",
				required: true,
			},
		],
		customer: {
			type: Types.ObjectId || String,
			required: true,
			ref: "User",
		},
		shipping: {
			type: Types.ObjectId || String,
			required: true,
			ref: "Shipping",
		},
		payment: {
			type: Types.ObjectId || String,
			required: true,
			ref: "Payment",
		},
		status: {
			type: String,
			enum: Object.values(OrderStatus),
		},
		date: {
			type: Date,
			required: true,
		},
	},
	hooks(schema) {
		schema.pre("save", function (this, next) {
			this.title = this.title.toString().trim() as any;
			next();
		});

		schema.pre("validate", function (this, next) {
			if (this.products.length === 0) {
				next(new Error("Products array must not be empty"));
			} else {
				next();
			}
		});
	},
});
