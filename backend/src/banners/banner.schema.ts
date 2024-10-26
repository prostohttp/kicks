import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as GraphQLTypes from "src/graphql-types";

export type BannerDocument = HydratedDocument<Banner>;

@Schema()
export class Banner implements GraphQLTypes.Banner {
  @Prop({ required: true, type: String, min: 3 })
  title: string;

  @Prop({
    type: [
      {
        id: {
          type: Number,
          requred: true,
        },
        heading: {
          type: String,
          required: false,
        },
        description: {
          type: String,
          required: false,
        },
        image: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: false,
        },
        sort: {
          type: Number,
          required: true,
        },
      },
    ],
    required: true,
  })
  banners: [
    {
      id: number;
      heading: string;
      description: string;
      image: string;
      url: string;
      sort: number;
    },
  ];
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
