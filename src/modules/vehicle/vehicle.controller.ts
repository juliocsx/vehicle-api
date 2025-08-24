import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { UpdateVehicleDto } from './dtos/update-vehicle.dto';
import { AuthGuard } from '../auth/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationQuery } from 'src/shared/dtos/types';
import { VehicleQueryDto } from './dtos/query-vehicle.dto';

@ApiTags('Vehicle')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  @ApiOperation({ summary: 'Registra um novo Veiculo' })
  @ApiResponse({
    status: 201,
    description: 'Veiculo registrado com sucesso.',
  })
  async create(@Body() data: CreateVehicleDto) {
    return this.vehicleService.createVehicle(data);
  }

  @Get()
  @ApiOperation({ summary: 'Lista Todos os Veiculos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de veiculos retornada com sucesso.',
  })
  async findAll(
    @Query() query: VehicleQueryDto,
    @Query() pagination: PaginationQuery,
  ) {
    return this.vehicleService.findAll({ ...query, ...pagination });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza o Veiculo apartir do user_id' })
  @ApiParam({ name: 'id', description: 'id do veiculo' })
  @ApiResponse({
    status: 200,
    description: 'Veiculo atualizado com sucesso.',
  })
  async update(@Param('id') id: string, @Body() data: UpdateVehicleDto) {
    return this.vehicleService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui o Veiculo apartir do user_id' })
  @ApiParam({ name: 'id', description: 'id do veiculo' })
  @ApiResponse({
    status: 204,
    description: 'Veiculo excluido com sucesso.',
  })
  async delete(@Param('id') id: string) {
    return this.vehicleService.delete(id);
  }
}
