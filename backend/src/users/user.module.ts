import { Module } from "@nestjs/common";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";

@Module({
  imports: [],
  controllers: [],
  providers: [UsersResolver, UsersService],
  exports: [],
})
export class UserModule {}
