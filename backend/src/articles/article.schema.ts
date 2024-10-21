import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { Product } from "../products/product.schema";
import * as GraphQLTypes from "src/graphql-types";

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article implements GraphQLTypes.Article {
  @Prop({ required: true, min: 3, type: String })
  title: string;

  @Prop({ required: true, min: 15, type: String })
  shortDescription: string;

  @Prop({ required: false, type: String })
  description: string;

  @Prop({ required: true, type: Boolean })
  isEnabled: boolean;

  @Prop({ required: true, type: Boolean })
  adminMenu: boolean;

  @Prop({ required: true, type: Boolean })
  siteMenu: boolean;

  @Prop({ required: true, type: Number })
  sort: number;

  @Prop({ required: false, type: String })
  image: string;

  @Prop({
    type: [
      {
        type: MongooseSchema.Types.ObjectId,
        ref: "Product",
        required: false,
      },
    ],
  })
  featuredProducts: Product[];

  @Prop({ required: true, type: Date })
  createdAt: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
