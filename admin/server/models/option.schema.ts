import { defineMongooseModel } from "#nuxt/mongoose";

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
      required: true,
    },
    sort: {
      type: Number,
      required: true,
    },
    // TODO: Валидация полей на фронте value, sort
    values: [
      {
        id: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: false,
        },
        sort: {
          type: Number,
          required: false,
        },
        image: {
          type: String,
          required: false,
        },
      },
    ],
  },
  hooks(schema) {
    schema.pre("save", function (this, next) {
      this.title = this.title.toString().toLowerCase().trim() as any;
      next();
    });
  },
});
