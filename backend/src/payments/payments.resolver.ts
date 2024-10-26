import { Args, Query, Resolver } from "@nestjs/graphql";
import { PaymentsService } from "./payments.service";
import * as GraphQlTypes from "src/graphql-types";

@Resolver("Payment")
export class PaymentsResolver {
  constructor(private readonly paymentService: PaymentsService) {}

  @Query("payments")
  async findAll(): Promise<GraphQlTypes.Payment[]> {
    return await this.paymentService.findAll();
  }

  @Query("payment")
  async findOne(@Args("id") id: string): Promise<GraphQlTypes.Payment> {
    return await this.paymentService.findOne(id);
  }
}
