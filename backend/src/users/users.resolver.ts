import { ParseIntPipe } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { User } from "src/graphql-types";

@Resolver("User")
export class UsersResolver {
  constructor() {}

  users: User[] = [
    {
      _id: "232323242fd323",
      name: "Mikele",
      email: "memphis.sail@gmail.com",
      role: "Admin",
      orders: [],
    },
  ];

  @Query("user")
  findOne(@Args("index", ParseIntPipe) index: number): User {
    return this.users[index];
  }

  @Query("users")
  async findAll(): Promise<User[]> {
    return this.users;
  }
}
