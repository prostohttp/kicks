import { Args, Query, Resolver } from "@nestjs/graphql";
import * as GraphQlTypes from "src/graphql-types";
import { ProductsService } from "./products.service";

@Resolver("Product")
export class ProductsResolver {
  constructor(private readonly productService: ProductsService) {}

  @Query("product")
  async findOne(@Args("id") id: string): Promise<GraphQlTypes.Product> {
    return await this.productService.findOne(id);
  }

  @Query("productsByBrand")
  async findProductsByBrand(
    @Args("id") id: string,
    @Args("offset") offset: number,
    @Args("limit") limit: number,
  ): Promise<GraphQlTypes.ProductWithBrand[]> {
    return await this.productService.findProductsByBrand(id, offset, limit);
  }

  @Query("productsByCategory")
  async findProductsByCategory(
    @Args("id") id: string,
    @Args("offset") offset: number,
    @Args("limit") limit: number,
  ): Promise<GraphQlTypes.ProductWithCategory[]> {
    return await this.productService.findProductsByCategory(id, offset, limit);
  }
}
