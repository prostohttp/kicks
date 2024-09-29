import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ collection: "categories" })
export class Category {
  @Prop({ required: true, min: 3, type: String })
  title: string;

  @Prop({ required: false, type: String })
  image: string;

  @Prop({ required: false, type: String })
  description: string;

  @Prop({ required: true, type: Boolean })
  isParent: boolean;

  @Prop([
    {
      type: MongooseSchema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  ])
  children: (MongooseSchema.Types.ObjectId | string)[];

  @Prop({ required: true, type: Boolean })
  isEnabled: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
