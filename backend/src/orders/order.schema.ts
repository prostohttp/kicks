import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import mongoose from "mongoose";
import { OrderStatus } from "src/types/order-status";
import * as GraphQLTypes from "src/graphql-types";
import { Product } from "src/products/product.schema";
import { User } from "src/users/user.schema";
import { Shipping } from "src/shippings/shipping.schema";
import { Payment } from "src/payments/payment.schema";

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order implements GraphQLTypes.Order {
  @Prop({ required: true, unique: true, type: mongoose.Types.ObjectId })
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
  date: string;

  @Prop({ required: false, type: String })
  note: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
