import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { Option } from "../options/option.schema";
import { Brand } from "../brands/brand.schema";
import { Category } from "../categories/category.schema";
import * as GraphQLTypes from "src/graphql-types";
import { OptionValue } from "src/option-values/option-value.schema";

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product implements GraphQLTypes.Product {
  @Prop({ required: true, min: 3, type: String })
  title: string;

  @Prop({ required: true, min: 15, type: String })
  shortDescription: string;

  @Prop({ required: false, type: String })
  description: string;

  @Prop({
    type: [
      {
        type: MongooseSchema.Types.ObjectId,
        ref: "Category",
        required: false,
      },
    ],
  })
  category: Category[];

  @Prop({
    type: [
      {
        optionValue: {
          type: MongooseSchema.Types.ObjectId,
          required: false,
          ref: "Option",
        },
        value: {
          type: String,
          required: false,
        },
        required: {
          type: Boolean,
          required: true,
        },
        sort: {
          type: Number,
          required: true,
        },
        values: [
          {
            optionValue: {
              type: MongooseSchema.Types.ObjectId,
              required: true,
              ref: "OptionValue",
            },
            price: {
              type: Number,
              required: false,
            },
            count: {
              type: Number,
              required: false,
            },
          },
        ],
      },
    ],
  })
  options: {
    optionValue: Option;
    value: string;
    required: boolean;
    sort: number;
    values: { optionValue: OptionValue; price: number; count: number }[];
  }[];

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "Brand",
    required: false,
  })
  brand: Brand;

  @Prop({ required: false, min: 3, type: String })
  sku: string;

  @Prop({ required: true, type: Number })
  quantity: number;

  @Prop({ required: true, type: Number })
  regularPrice: number;

  @Prop({ required: false, type: Number })
  salePrice: number;

  @Prop([{ required: false, type: String }])
  tags: string[];

  @Prop({ required: false, type: String })
  image: string;

  @Prop({ type: [{ required: false, type: String }] })
  additionImages: string[];

  @Prop({
    type: {
      label: {
        type: String,
        required: true,
      },
      value: {
        type: Boolean,
        required: true,
      },
    },
  })
  isEnabled: { label: string; value: boolean };

  @Prop({ required: true, type: Date })
  createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
