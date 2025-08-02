import { Body, Controller, Get, Header, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body()
    user: CreateUserDto
  ) {
    return await this.userService.create(user)
  }

  @Get()
  async findAll() {
    return await this.userService.findAll()
  }
}
