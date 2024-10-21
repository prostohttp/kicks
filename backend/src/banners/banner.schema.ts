import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as GraphQLTypes from "src/graphql-types";

export type BannerDocument = HydratedDocument<Banner>;

@Schema()
export class Banner implements GraphQLTypes.Banner {
  @Prop({ required: true, type: Number })
  id: number;

  @Prop({ required: false, type: String })
  heading: string;

  @Prop({ required: true, type: String })
  image: string;

  @Prop({ required: false, type: String })
  url: string;

  @Prop({ required: true, type: Number })
  sort: number;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
