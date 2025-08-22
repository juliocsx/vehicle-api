import { Injectable } from '@nestjs/common';
import { CarModel } from './car-model.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCarModelDto } from './dtos/create-car-model.dto';
import { CreationAttributes } from 'sequelize';
import { UpdateCarModelDto } from './dtos/update-car-model.dto';

@Injectable()
export class CarModelService {
  constructor(
    @InjectModel(CarModel)
    private readonly carModelModel: typeof CarModel,
  ) {}

  async create(data: CreateCarModelDto) {
    const createdCarModel = await this.carModelModel.create(data);
    return createdCarModel;
  }

  async findAll() {
    return await this.carModelModel.findAll();
  }

  async update(id: string, data: UpdateCarModelDto) {
    const updatedCarModel = await this.carModelModel.update(data, {
      where: { car_model_id: id },
      returning: true,
    });
    return updatedCarModel[1][0];
  }

  async delete(id: string) {
    return await this.carModelModel.destroy({ where: { id } });
  }
}
