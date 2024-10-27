import { Injectable } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { InjectModel } from "@nestjs/mongoose";
import { GraphQLError } from "graphql";
import { Model } from "mongoose";
import { Order } from "./order.schema";
import { NotificationsService } from "src/notifications/notifications.service";
import * as GraphQlTypes from "src/graphql-types";
import { Notification } from "src/notifications/notififcation.schema";

@Injectable()
export class OrdersService {
  private notificationService: NotificationsService;
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.notificationService = this.moduleRef.get(NotificationsService);
  }

  async findOne(id: string): Promise<Order> {
    const order = this.orderModel.findById(id);
    if (!order) {
      throw new GraphQLError(`Заказ с ${id} не найден!`);
    }
    return order;
  }

  async findAllByCustomer(id: string): Promise<Order[]> {
    const orders = await this.orderModel
      .find({ customer: id })
      .populate([
        "products.productId",
        "customer",
        "shipping",
        "payment",
        "status",
      ]);
    if (!orders.length) {
      throw new GraphQLError(`Заказы у ${id} покупателя не найдены!`);
    }
    return orders;
  }

  async addOne(
    input: GraphQlTypes.InputOrder,
  ): Promise<{ order: Order; notification: Notification }> {
    const order = new this.orderModel(input);
    await order.save();
    const notification = await this.notificationService.addOne(
      order._id.toString(),
    );
    return {
      order,
      notification,
    };
  }
}
