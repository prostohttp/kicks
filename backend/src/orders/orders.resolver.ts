import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { OrdersService } from "./orders.service";
import * as GraphQlTypes from "src/graphql-types";

@Resolver("Order")
export class OrdersResolver {
  constructor(private readonly orderService: OrdersService) {}

  @Query("order")
  async findOne(@Args("id") id: string): Promise<GraphQlTypes.Order> {
    return this.orderService.findOne(id);
  }

  @Query("orders")
  async findAllByCustomer(
    @Args("id") id: string,
  ): Promise<GraphQlTypes.Order[]> {
    return await this.orderService.findAllByCustomer(id);
  }

  @Mutation("addOrder")
  async addOne(@Args("order") order: GraphQlTypes.InputOrder): Promise<{
    order: GraphQlTypes.Order;
    notification: GraphQlTypes.Notification;
  }> {
    return await this.orderService.addOne(order);
  }
}
