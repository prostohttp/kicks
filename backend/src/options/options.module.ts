import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Option, OptionSchema } from "./option.schema";
import {
  OptionValue,
  OptionValueSchema,
} from "src/option-values/option-value.schema";
import { OptionsResolver } from "./options.resolver";
import { OptionsService } from "./options.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Option.name,
        schema: OptionSchema,
      },
      {
        name: OptionValue.name,
        schema: OptionValueSchema,
      },
    ]),
  ],
  providers: [OptionsResolver, OptionsService],
})
export class OptionsModule {}
