import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Currency } from "src/types/currency";
import { Locales } from "src/types/locale";

export type SettingsDocument = HydratedDocument<Settings>;

@Schema({ collection: "settings" })
export class Settings {
  @Prop({ required: false, type: String })
  image: string;

  @Prop([
    {
      value: {
        type: String,
        default: Locales.EN,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
    },
  ])
  localeDashboard: {
    value: Locales;
    label: string;
  };

  @Prop([
    {
      value: {
        type: String,
        default: Currency.USD,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
    },
  ])
  currency: {
    value: Currency;
    label: string;
  };

  @Prop([
    {
      value: {
        type: String,
        default: Currency.USD,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
    },
  ])
  mainCurrency: {
    value: Currency;
    label: string;
  };

  @Prop({ required: false, type: Number })
  secondCurrencyRate: number;

  @Prop({
    title: {
      type: String,
      min: 3,
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
  })
  en: {
    title: string;
    phone: string;
    description: string;
    email: string;
    address: string;
  };

  @Prop({
    title: {
      type: String,
      min: 3,
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
  })
  ru: {
    title: string;
    phone: string;
    description: string;
    email: string;
    address: string;
  };
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
