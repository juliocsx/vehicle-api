import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CarModelService } from './car-model.service';
import { CreateCarModelDto } from './dtos/create-car-model.dto';
import { UpdateCarModelDto } from './dtos/update-car-model.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('car-model')
export class CarModelController {
  constructor(private readonly carModelService: CarModelService) {}

  @Post()
  async createCarModel(@Body() data: CreateCarModelDto) {
    const carModel = await this.carModelService.create(data);
    return carModel;
  }

  @Get()
  async findAllCarModels() {
    return await this.carModelService.findAll();
  }

  @Patch(':id')
  async updateCarModel(
    @Param('id') id: string,
    @Body() data: UpdateCarModelDto,
  ) {
    return await this.carModelService.update(id, data);
  }

  @Post(':id')
  async deleteCarModel(@Param('id') id: string) {
    return await this.carModelService.delete(id);
  }
}
