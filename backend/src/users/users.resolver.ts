import { Args, Query, Resolver } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import * as GraphQlTypes from "src/graphql-types";

@Resolver("User")
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query("user")
  async findOne(@Args("id") id: string): Promise<GraphQlTypes.User> {
    return await this.userService.findOne(id);
  }
}
