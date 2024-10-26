import { Args, Query, Resolver } from "@nestjs/graphql";
import { ShippingsService } from "./shippings.service";
import * as GraphQlTypes from "src/graphql-types";

@Resolver("Shipping")
export class ShippingsResolver {
  constructor(private readonly shippingService: ShippingsService) {}

  @Query("shippings")
  async findAll(): Promise<GraphQlTypes.Shipping[]> {
    return await this.shippingService.findAll();
  }

  @Query("shipping")
  async findOne(@Args("id") id: string): Promise<GraphQlTypes.Shipping> {
    return await this.shippingService.findOne(id);
  }
}
