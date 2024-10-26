import { forwardRef, Module } from "@nestjs/common";
import { NotificationsResolver } from "./notifications.resolver";
import { NotificationsService } from "./notifications.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Notification, NotificationSchema } from "./notififcation.schema";
import { OrdersModule } from "src/orders/orders.module";
import { OrdersService } from "src/orders/orders.service";
import { Order, OrderSchema } from "src/orders/order.schema";

@Module({
  imports: [
    forwardRef(() => OrdersModule),
    MongooseModule.forFeature([
      {
        name: Notification.name,
        schema: NotificationSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
  ],
  providers: [NotificationsResolver, NotificationsService, OrdersService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
