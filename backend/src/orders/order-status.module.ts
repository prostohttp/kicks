import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OrderStatusResolver } from "./order-status.resolver";
import { OrderStatusService } from "./order-status.service";
import { OrderStatus, OrderStatusSchema } from "./order-status.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderStatus.name, schema: OrderStatusSchema },
    ]),
  ],
  providers: [OrderStatusResolver, OrderStatusService],
})
export class OrderStatusModule {}
