import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CarModelService } from './car-model.service';
import { CreateCarModelDto } from './dtos/create-car-model.dto';
import { UpdateCarModelDto } from './dtos/update-car-model.dto';
import { AuthGuard } from '../auth/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationQuery } from 'src/shared/dtos/types';
import { CarModelQueryDto } from './dtos/query-car-model.dto';

@ApiTags('Car Model')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('car-model')
export class CarModelController {
  constructor(private readonly carModelService: CarModelService) {}

  @Post()
  @ApiOperation({ summary: 'Registra um novo Modelo de Carro' })
  @ApiResponse({
    status: 201,
    description: 'Modelo de Carro registrado com sucesso.',
  })
  async createCarModel(@Body() data: CreateCarModelDto) {
    const carModel = await this.carModelService.create(data);
    return carModel;
  }

  @Get()
  @ApiOperation({ summary: 'Lista Todos os Modelos de Carro' })
  @ApiResponse({
    status: 200,
    description: 'Lista de Modelos de Carro retornada com sucesso.',
  })
  async findAllCarModels(
    @Query() query: CarModelQueryDto,
    @Query() pagination: PaginationQuery,
  ) {
    return await this.carModelService.findAll({ ...query, ...pagination });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza o Modelo de Carro apartir do user_id' })
  @ApiParam({ name: 'id', description: 'id do usuario' })
  @ApiResponse({
    status: 200,
    description: 'Modelo de Carro atualizado com sucesso.',
  })
  async updateCarModel(
    @Param('id') id: string,
    @Body() data: UpdateCarModelDto,
  ) {
    return await this.carModelService.update(id, data);
  }

  @Post(':id')
  @ApiOperation({ summary: 'Exclui o Modelo de Carro apartir do user_id' })
  @ApiParam({ name: 'id', description: 'id do usuario' })
  @ApiResponse({
    status: 204,
    description: 'Modelo de Carro excluido com sucesso.',
  })
  async deleteCarModel(@Param('id') id: string) {
    return await this.carModelService.delete(id);
  }
}
