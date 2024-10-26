import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GraphQLError } from "graphql";
import { Notification } from "./notififcation.schema";
import { OrdersService } from "src/orders/orders.service";

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
    private orderService: OrdersService,
  ) {}

  async findOne(id: string): Promise<Notification> {
    const notification = await this.notificationModel.findById(id);
    if (!notification) {
      throw new GraphQLError(`Уведомление с ${id} не найдено!`);
    }
    return notification;
  }

  async addOne(id: string): Promise<Notification> {
    const order = await this.orderService.findOne(id);
    if (!order) {
      throw new GraphQLError(`Заказ с ${id} не найден!`);
    }
    const notification = new this.notificationModel({
      order: id,
      isRead: false,
      createdAt: new Date(),
    });

    return await notification.save();
  }
}
