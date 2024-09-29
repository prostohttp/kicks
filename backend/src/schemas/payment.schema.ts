import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PaymentDocument = HydratedDocument<Payment>;

@Schema()
export class Payment {
  @Prop({ required: true, min: 3, unique: true, type: String })
  title: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
