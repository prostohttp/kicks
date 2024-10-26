import { Args, Query, Resolver } from "@nestjs/graphql";
import { CategoriesService } from "./categories.service";
import * as GraphQlTypes from "src/graphql-types";
import { GraphQLError } from "graphql";

@Resolver("Category")
export class CategoriesResolver {
  constructor(private readonly categoryService: CategoriesService) {}

  @Query("categories")
  async findAll(): Promise<GraphQlTypes.Category[]> {
    return this.categoryService.findAll();
  }

  @Query("category")
  async findOne(@Args("id") id: string): Promise<GraphQlTypes.Category> {
    const category = await this.categoryService.findOne(id);
    if (!category) {
      throw new GraphQLError(`Категория с ${id} не найдена!`);
    }
    return category;
  }
}
