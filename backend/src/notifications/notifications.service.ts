import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GraphQLError } from "graphql";
import { Notification } from "./notififcation.schema";
import { CreateNotificationDto } from "./dto/create-notification.dto";

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
  ) {}

  async findOne(id: string): Promise<Notification> {
    const notification = await this.notificationModel.findById(id);
    if (!notification) {
      throw new GraphQLError(`Уведомление с ${id} не найдено!`);
    }
    return notification;
  }

  async addOne(input: CreateNotificationDto): Promise<Notification> {
    // const notification = new this.notificationModel(input);
    // return await notification.save();
    return await this.notificationModel.create(input);
  }
}
