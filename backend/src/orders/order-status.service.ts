import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { OrderStatus } from "./order-status.schema";
import { Model } from "mongoose";
import { GraphQLError } from "graphql";

@Injectable()
export class OrderStatusService {
  constructor(
    @InjectModel(OrderStatus.name) private orderStatusModel: Model<OrderStatus>,
  ) {}

  async findOne(id: string): Promise<OrderStatus> {
    const orderStatus = await this.orderStatusModel.findById(id);
    if (!orderStatus) {
      throw new GraphQLError(`Статус заказа с ${id} не найден!`);
    }
    return orderStatus;
  }

  async findAll(): Promise<OrderStatus[]> {
    return await this.orderStatusModel.find();
  }
}
