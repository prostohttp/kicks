import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Banner } from "./banner.schema";
import { Model } from "mongoose";
import { GraphQLError } from "graphql";

@Injectable()
export class BannersService {
  constructor(@InjectModel(Banner.name) private bannerModel: Model<Banner>) {}

  async findOne(id: string): Promise<Banner> {
    const banner = await this.bannerModel.findById(id);
    if (!banner) {
      throw new GraphQLError(`Баннер с ${id} не найден!`);
    }
    return banner;
  }
}
