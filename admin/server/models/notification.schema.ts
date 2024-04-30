import { defineMongooseModel } from "#nuxt/mongoose";
import { Types } from "mongoose";

export const Notification = defineMongooseModel({
  name: "Notification",
  schema: {
    title: {
      min: 3,
      type: String,
      required: true,
    },
    order: {
      type: Types.ObjectId || String,
      required: true,
      ref: "Order",
    },
    isRead: {
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
});
