import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as GraphQLTypes from "src/graphql-types";

export type OrderDocument = HydratedDocument<OrderStatus>;

@Schema()
export class OrderStatus implements GraphQLTypes.OrderStatus {
  @Prop({ required: true, type: String })
  en: string;

  @Prop({ required: true, type: String })
  ru: string;
}

export const OrderStatusSchema = SchemaFactory.createForClass(OrderStatus);
