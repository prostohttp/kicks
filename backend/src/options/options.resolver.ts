import { Args, Query, Resolver } from "@nestjs/graphql";
import { OptionsService } from "./options.service";
import * as GraphQlTypes from "src/graphql-types";

@Resolver("Option")
export class OptionsResolver {
  constructor(private readonly optionService: OptionsService) {}

  @Query("options")
  async findAll(): Promise<GraphQlTypes.Option[]> {
    return await this.optionService.findAll();
  }

  @Query("option")
  async findOne(@Args("id") id: string): Promise<GraphQlTypes.Option> {
    return await this.optionService.findOne(id);
  }
}
