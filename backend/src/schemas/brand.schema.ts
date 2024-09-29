import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type BrandDocument = HydratedDocument<Brand>;

@Schema()
export class Brand {
  @Prop({ required: true, min: 3, type: String })
  title: string;

  @Prop({ required: false, type: String })
  description: string;

  @Prop({ required: false, type: String })
  image: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
