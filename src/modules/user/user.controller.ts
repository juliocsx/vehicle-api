import { Body, Controller, Get, Header, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(
    @Body()
    user: object
  ) {
    return this.userService.create(user)
  }
}
