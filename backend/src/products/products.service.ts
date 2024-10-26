import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./product.schema";
import { Model } from "mongoose";
import { GraphQLError } from "graphql";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel
      .findById(id)
      .populate([
        "category",
        "options.optionValue",
        "options.values.optionValue",
        "brand",
      ]);
    if (!product) {
      throw new GraphQLError(`Товар с ${id} не найден!`);
    }
    return product;
  }

  async findProductsByBrand(
    id: string,
    offset: number = 0,
    limit: number = 10,
  ): Promise<Product[]> {
    return await this.productModel
      .find({ brand: id })
      .populate("brand")
      .skip(offset)
      .limit(limit);
  }

  async findProductsByCategory(
    id: string,
    offset: number = 0,
    limit: number = 10,
  ): Promise<Product[]> {
    return await this.productModel
      .find({ category: { $in: id } })
      .populate("category")
      .skip(offset)
      .limit(limit);
  }
}
