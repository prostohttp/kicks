import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { OrderStatus } from "src/types/order-status";

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ required: true, unique: true, type: String })
  orderId: string;

  @Prop([
    {
      productId: {
        type: MongooseSchema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      productCount: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ])
  products: {
    productId: MongooseSchema.Types.ObjectId | string;
    productCount: number;
  }[];

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "User",
    required: true,
  })
  customerId: MongooseSchema.Types.ObjectId | string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "Shipping",
    required: true,
  })
  shipping: MongooseSchema.Types.ObjectId | string;

  @Prop({ required: false, type: String })
  shippingAddress: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "Payment",
    required: true,
  })
  payment: MongooseSchema.Types.ObjectId | string;

  @Prop({
    required: true,
    default: OrderStatus.PROCESSING,
    type: String,
  })
  status: OrderStatus;

  @Prop({ required: true, type: Date })
  date: Date;

  @Prop({ required: false, type: String })
  note: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
