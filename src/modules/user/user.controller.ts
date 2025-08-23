import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Abobrinha 2')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: CreateUserDto) {
    return await this.userService.create(user);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Lista Todos os Usuarios' })
  @ApiBearerAuth()
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso.',
  })
  async findAll() {
    return await this.userService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiParam({ name: 'id', description: 'id do usuario' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return await this.userService.update(id, user);
  }
}
