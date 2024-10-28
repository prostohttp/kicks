import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OrdersResolver } from "./orders.resolver";
import { OrdersService } from "./orders.service";
import { Order, OrderSchema } from "./order.schema";
import { Product, ProductSchema } from "src/products/product.schema";
import { User, UserSchema } from "src/users/user.schema";
import { Shipping, ShippingSchema } from "src/shippings/shipping.schema";
import { Payment, PaymentSchema } from "src/payments/payment.schema";
import { NotificationsModule } from "src/notifications/notifications.module";
import { NotificationsService } from "src/notifications/notifications.service";
import {
  Notification,
  NotificationSchema,
} from "src/notifications/notififcation.schema";
import { OrderStatus, OrderStatusSchema } from "./order-status.schema";
import { UserModule } from "src/users/user.module";
import { UsersService } from "src/users/users.service";
import { ShippingsService } from "src/shippings/shippings.service";
import { ShippingsModule } from "src/shippings/shippings.module";
import { PaymentsModule } from "src/payments/payments.module";
import { PaymentsService } from "src/payments/payments.service";

@Module({
  imports: [
    NotificationsModule,
    UserModule,
    ShippingsModule,
    PaymentsModule,
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Shipping.name,
        schema: ShippingSchema,
      },
      {
        name: Payment.name,
        schema: PaymentSchema,
      },
      {
        name: Notification.name,
        schema: NotificationSchema,
      },
      {
        name: OrderStatus.name,
        schema: OrderStatusSchema,
      },
    ]),
  ],
  providers: [
    OrdersResolver,
    OrdersService,
    NotificationsService,
    UsersService,
    ShippingsService,
    PaymentsService,
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
