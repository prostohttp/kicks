import { Args, Query, Resolver } from "@nestjs/graphql";
import { ArticlesService } from "./articles.service";
import * as GraphQlTypes from "src/graphql-types";

@Resolver("Article")
export class ArticlesResolver {
  constructor(private readonly articleService: ArticlesService) {}

  @Query("article")
  async findOne(@Args("id") id: string): Promise<GraphQlTypes.Article> {
    return await this.articleService.findOne(id);
  }

  @Query("articles")
  async findAll(
    @Args("offset") offset: number = 0,
    @Args("limit") limit: number = 10,
  ): Promise<GraphQlTypes.Article[]> {
    return await this.articleService.findAll(offset, limit);
  }
}
