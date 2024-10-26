import { Injectable } from "@nestjs/common";
import { Brand } from "./brand.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GraphQLError } from "graphql";

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  async findAll(): Promise<Brand[]> {
    return await this.brandModel.find();
  }

  async findOne(id: string): Promise<Brand> {
    const brand = await this.brandModel.findById(id);
    if (!brand) {
      throw new GraphQLError(`Бренд с ${id} не найден!`);
    }
    return brand;
  }
}
