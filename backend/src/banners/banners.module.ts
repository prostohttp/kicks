import { Module } from "@nestjs/common";
import { Banner, BannerSchema } from "./banner.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { BannersResolver } from "./banners.resolver";
import { BannersService } from "./banners.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Banner.name, schema: BannerSchema }]),
  ],
  providers: [BannersResolver, BannersService],
})
export class BannersModule {}
