import { Module } from "@nestjs/common";
import { UsersResolver } from "./users.resolver";

@Module({
  imports: [],
  controllers: [],
  providers: [UsersResolver],
  exports: [],
})
export class UserModule {}
