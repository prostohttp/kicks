import { Args, Query, Resolver } from "@nestjs/graphql";
import * as GraphQlTypes from "src/graphql-types";
import { BannersService } from "./banners.service";

@Resolver("Banner")
export class BannersResolver {
  constructor(private readonly bannerService: BannersService) {}

  @Query("banner")
  async findOne(@Args("id") id: string): Promise<GraphQlTypes.Banner> {
    return await this.bannerService.findOne(id);
  }
}
