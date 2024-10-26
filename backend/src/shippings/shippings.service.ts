import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Shipping } from "./shipping.schema";
import { InjectModel } from "@nestjs/mongoose";
import { GraphQLError } from "graphql";

@Injectable()
export class ShippingsService {
  constructor(
    @InjectModel(Shipping.name) private shippingModel: Model<Shipping>,
  ) {}

  async findAll(): Promise<Shipping[]> {
    return this.shippingModel.find();
  }

  async findOne(id: string): Promise<Shipping> {
    const shipping = await this.shippingModel.findById(id);
    if (!shipping) {
      throw new GraphQLError(`Доставка с ${id} не найдена!`);
    }
    return shipping;
  }
}
