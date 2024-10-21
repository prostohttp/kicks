import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as GraphQLTypes from "src/graphql-types";

export type PaymentDocument = HydratedDocument<Payment>;

@Schema()
export class Payment implements GraphQLTypes.Payment {
  @Prop({ required: true, min: 3, unique: true, type: String })
  title: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
