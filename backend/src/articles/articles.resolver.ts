import { Args, Query, Resolver } from "@nestjs/graphql";
import * as GraphQlTypes from "src/graphql-types";
import { ArticlesService } from "./articles.service";

@Resolver("Article")
export class ArticlesResolver {
  constructor(private readonly articleService: ArticlesService) {}

  @Query("articles")
  async findAll(): Promise<GraphQlTypes.Article[]> {
    return await this.articleService.findAll();
  }

  @Query("article")
  async findOne(@Args("id") id: string): Promise<GraphQlTypes.Article> {
    return await this.articleService.findOne(id);
  }

  @Query("articlesForPagination")
  async findMany(
    @Args("offset") offset: number,
    @Args("limit") limit: number,
  ): Promise<GraphQlTypes.Article[]> {
    return await this.articleService.findMany(offset, limit);
  }
}
