import { Args, Resolver, Query } from "@nestjs/graphql";
import { OrderStatusService } from "./order-status.service";
import * as GraphQlTypes from "src/graphql-types";

@Resolver("OrderStatus")
export class OrderStatusResolver {
  constructor(private readonly orderStatusServise: OrderStatusService) {}

  @Query("orderStatuses")
  async findAll(): Promise<GraphQlTypes.OrderStatus[]> {
    return this.orderStatusServise.findAll();
  }

  @Query("orderStatus")
  async findOne(@Args("id") id: string): Promise<GraphQlTypes.OrderStatus> {
    return this.orderStatusServise.findOne(id);
  }
}
