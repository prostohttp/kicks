import { defineMongooseModel } from "#nuxt/mongoose";

export const Settings = defineMongooseModel({
  name: "Settings",
  schema: {
    logo: {
      type: String,
      required: true,
    },
    localeDashboard: {
      type: String,
      enum: Object.values(Locales),
      required: true,
    },
    localeStore: {
      type: String,
      enum: Object.values(Locales),
      required: true,
    },
    currency: {
      type: String,
      enum: Object.values(Currency),
      required: true,
    },
    en: {
      title: {
        min: 3,
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      description: {
        min: 10,
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: false,
      },
    },
    ru: {
      title: {
        min: 3,
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      description: {
        min: 10,
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: false,
      },
    },
  },
  options: {
    collection: "settings",
  },
});
