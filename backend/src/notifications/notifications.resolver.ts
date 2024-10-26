import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { NotificationsService } from "./notifications.service";
import * as GraphQlTypes from "src/graphql-types";

@Resolver("Notification")
export class NotificationsResolver {
  constructor(private readonly notificationServise: NotificationsService) {}

  @Query("notification")
  async findOne(@Args("id") id: string): Promise<GraphQlTypes.Notification> {
    return this.notificationServise.findOne(id);
  }

  @Mutation("addNotfication")
  async addOne(@Args("id") id: string): Promise<GraphQlTypes.Notification> {
    return await this.notificationServise.addOne(id);
  }
}
