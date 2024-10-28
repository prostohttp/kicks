import { IsBoolean, IsDate, IsNotEmpty } from "class-validator";
import * as GraphQlTypes from "src/graphql-types";

export class CreateNotificationDto extends GraphQlTypes.InputNotification {
  @IsNotEmpty({ message: "Не пустое поле" })
  order: string;

  @IsDate({ message: "Не пустое поле" })
  createdAt: Date;

  @IsBoolean({ message: "Булево значение" })
  isRead: boolean;
}
