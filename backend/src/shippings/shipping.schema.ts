import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
export type ShippingDocument = HydratedDocument<Shipping>;
import * as GraphQLTypes from "src/graphql-types";

@Schema()
export class Shipping implements GraphQLTypes.Shipping {
  @Prop({ required: true, min: 3, type: String, unique: true })
  title: string;

  @Prop({ required: false, type: String })
  description: string;

  @Prop({ required: true, type: Number })
  price: number;
}

export const ShippingSchema = SchemaFactory.createForClass(Shipping);
