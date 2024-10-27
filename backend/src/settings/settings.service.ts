import { Injectable } from "@nestjs/common";
import { Settings } from "./settings.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings.name) private settingsModel: Model<Settings>,
  ) {}

  async getSettings(): Promise<Settings> {
    const settings = await this.settingsModel
      .find()
      .populate(["startOrderStatus", "endOrderStatus"]);
    return settings[0];
  }
}
