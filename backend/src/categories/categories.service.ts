import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category } from "./category.schema";
import { Model } from "mongoose";
import { GraphQLError } from "graphql";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryModel
      .find({ isEnabled: true })
      .populate("children");
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).populate("children");
    if (!category) {
      throw new GraphQLError(`Категория с ${id} не найдена!`);
    }
    return category;
  }
}
