import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Brand, BrandSchema } from "./brand.schema";
import { BrandsResolver } from "./brands.resolver";
import { BrandsService } from "./brands.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
  ],
  providers: [BrandsResolver, BrandsService],
})
export class BrandsModule {}
