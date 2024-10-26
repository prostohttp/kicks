import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Option } from "./option.schema";
import { Model } from "mongoose";
import { GraphQLError } from "graphql";

@Injectable()
export class OptionsService {
  constructor(@InjectModel(Option.name) private optionModel: Model<Option>) {}

  async findAll(): Promise<Option[]> {
    return this.optionModel.find().populate("values");
  }

  async findOne(id: string): Promise<Option> {
    const option = await this.optionModel.findById(id).populate("values");
    if (!option) {
      throw new GraphQLError(`Опция с ${id} не найдена!`);
    }
    return option;
  }
}
