import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { Option } from "./option.schema";
import { Brand } from "./brand.schema";
import { Category } from "./category.schema";

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
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
        type: MongooseSchema.Types.ObjectId,
        ref: "Option",
        required: false,
      },
    ],
  })
  options: Option[];

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
    required: true,
  })
  isEnabled: { label: string; value: boolean };

  @Prop({ required: true, type: Date })
  createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
