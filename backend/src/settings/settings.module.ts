import { Module } from "@nestjs/common";
import { SettingsResolver } from "./settings.resolver";
import { SettingsService } from "./settings.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Settings, SettingsSchema } from "./settings.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Settings.name, schema: SettingsSchema },
    ]),
  ],
  providers: [SettingsResolver, SettingsService],
})
export class SettingsModule {}
