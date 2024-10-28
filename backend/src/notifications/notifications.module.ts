import { Module } from "@nestjs/common";
import { NotificationsResolver } from "./notifications.resolver";
import { NotificationsService } from "./notifications.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Notification, NotificationSchema } from "./notififcation.schema";
import { Order, OrderSchema } from "src/orders/order.schema";

@Module({
  imports: [
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
  providers: [NotificationsResolver, NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
