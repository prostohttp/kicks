import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Article } from "./article.schema";
import * as GraphQlTypes from "src/graphql-types";

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
  ) {}

  async findAll(): Promise<GraphQlTypes.Article[]> {
    return await this.articleModel.find().populate("featuredProducts");
  }

  async findOne(id: string): Promise<GraphQlTypes.Article> {
    return await this.articleModel.findById(id).populate("featuredProducts");
  }

  async findMany(
    offset: number,
    limit: number,
  ): Promise<GraphQlTypes.Article[]> {
    return await this.articleModel
      .find()
      .populate("featuredProducts")
      .skip(offset)
      .limit(limit);
  }
}
