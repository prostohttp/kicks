import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductsResolver } from "./products.resolver";
import { ProductsService } from "./products.service";
import { Product, ProductSchema } from "./product.schema";
import { Category, CategorySchema } from "src/categories/category.schema";
import { Option, OptionSchema } from "src/options/option.schema";
import {
  OptionValue,
  OptionValueSchema,
} from "src/option-values/option-value.schema";
import { Brand, BrandSchema } from "src/brands/brand.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Option.name, schema: OptionSchema },
      { name: OptionValue.name, schema: OptionValueSchema },
      { name: Brand.name, schema: BrandSchema },
    ]),
  ],
  providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
