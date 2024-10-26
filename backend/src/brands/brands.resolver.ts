import { Args, Query, Resolver } from "@nestjs/graphql";
import { BrandsService } from "./brands.service";
import * as GraphQlTypes from "src/graphql-types";

@Resolver("Brand")
export class BrandsResolver {
  constructor(private readonly brandService: BrandsService) {}

  @Query("brands")
  async findAll(): Promise<GraphQlTypes.Brand[]> {
    return await this.brandService.findAll();
  }

  @Query("brand")
  async findOne(@Args("id") id: string): Promise<GraphQlTypes.Brand> {
    return await this.brandService.findOne(id);
  }
}
