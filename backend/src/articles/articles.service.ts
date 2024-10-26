import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Article } from "./article.schema";
import { GraphQLError } from "graphql";

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
  ) {}

  async findOne(id: string): Promise<Article> {
    const article = await this.articleModel
      .findOne({ _id: id, isEnabled: 1 })
      .populate("featuredProducts");
    if (!article) {
      throw new GraphQLError(`Статья с ${id} не найдена!`);
    }
    return article;
  }

  async findAll(offset: number, limit: number): Promise<Article[]> {
    return await this.articleModel
      .find({ isEnabled: 1 })
      .skip(offset)
      .limit(limit);
  }
}
