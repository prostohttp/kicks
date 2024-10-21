import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Article, ArticleSchema } from "./article.schema";
import { ArticlesResolver } from "./articles.resolver";
import { ArticlesService } from "./articles.service";
import { Product, ProductSchema } from "src/products/product.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  providers: [ArticlesResolver, ArticlesService],
})
export class ArticlesModule {}
