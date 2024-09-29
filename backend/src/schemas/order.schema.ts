import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { OrderStatus } from "src/types/order-status";
import { Product } from "./product.schema";
import { User } from "./user.schema";
import { Shipping } from "./shipping.schema";
import { Payment } from "./payment.schema";

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ required: true, unique: true, type: String })
  orderId: string;

  @Prop({
    type: [
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
    ],
  })
  products: {
    productId: Product;
    productCount: number;
  }[];

  @Prop({
    type: {
      type: MongooseSchema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  })
  customerId: User;

  @Prop({
    type: {
      type: MongooseSchema.Types.ObjectId,
      ref: "Shipping",
      required: true,
    },
  })
  shipping: Shipping;

  @Prop({ required: false, type: String })
  shippingAddress: string;

  @Prop({
    type: {
      type: MongooseSchema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
  })
  payment: Payment;

  @Prop({
    type: {
      required: true,
      default: OrderStatus.PROCESSING,
      type: String,
    },
  })
  status: OrderStatus;

  @Prop({ required: true, type: Date })
  date: Date;

  @Prop({ required: false, type: String })
  note: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
