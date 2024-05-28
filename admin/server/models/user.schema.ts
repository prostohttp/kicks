import { defineMongooseModel } from "#nuxt/mongoose";
import { Roles } from "~/types/server/server.types";

export const User = defineMongooseModel({
  name: "User",
  schema: {
    name: {
      min: 3,
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      min: 6,
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(Roles),
    },
    image: {
      type: String,
      required: false,
    },
  },
  hooks(schema) {
    schema.pre("save", function (this, next) {
      this.email = this.email.toString().toLowerCase().trim() as any;
      next();
    });
  },
});
