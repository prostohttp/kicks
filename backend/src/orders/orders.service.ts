import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { GraphQLError } from "graphql";
import { Model } from "mongoose";
import { Order } from "./order.schema";
import { NotificationsService } from "src/notifications/notifications.service";
import { Notification } from "src/notifications/notififcation.schema";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UsersService } from "src/users/users.service";
import { ShippingsService } from "src/shippings/shippings.service";
import { PaymentsService } from "src/payments/payments.service";

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private notificationService: NotificationsService,
    private userService: UsersService,
    private shippingService: ShippingsService,
    private paymentService: PaymentsService,
  ) {}

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
    input: CreateOrderDto,
  ): Promise<{ order: Order; notification: Notification }> {
    // TODO: Рефакторинг?
    const customer = await this.userService.findFlatUser(input.customer);
    const shipping = await this.shippingService.findOne(input.shipping);
    const payment = await this.paymentService.findOne(input.payment);

    if (customer && shipping && payment) {
      const order = new this.orderModel(input);
      await order.save();
      const notification = await this.notificationService.addOne({
        order: order._id.toString(),
        isRead: false,
        createdAt: new Date(),
      });
      return {
        order,
        notification,
      };
    }
  }
}
