// import {
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
//   ValidationOptions,
//   registerDecorator,
// } from "class-validator";
// import { Injectable } from "@nestjs/common";
// import { UserService } from "../user/user.service";

// @ValidatorConstraint({ async: true })
// @Injectable()
// export class IsUniqueEmailConstraint implements ValidatorConstraintInterface {
//   constructor(private readonly userService: UserService) {}

//   async validate(email: string) {
//     const user = await this.userService.findByEmail(email);
//     return !user;
//   }

//   defaultMessage() {
//     return "Email уже используется";
//   }
// }

// export function IsUniqueEmail(validationOptions?: ValidationOptions) {
//   return function (object: any, propertyName: string) {
//     registerDecorator({
//       target: object.constructor,
//       propertyName: propertyName,
//       options: validationOptions,
//       constraints: [],
//       async: true,
//       validator: IsUniqueEmailConstraint,
//     });
//   };
// }
