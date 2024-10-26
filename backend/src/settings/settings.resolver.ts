import { Query, Resolver } from "@nestjs/graphql";
import { SettingsService } from "./settings.service";
import * as GraphQlTypes from "src/graphql-types";

@Resolver("Settings")
export class SettingsResolver {
  constructor(private readonly settingsServise: SettingsService) {}

  @Query("settings")
  async getSettings(): Promise<GraphQlTypes.Settings> {
    return this.settingsServise.getSettings();
  }
}
