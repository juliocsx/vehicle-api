import { Injectable } from '@nestjs/common';
import { CarModel } from './car-model.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCarModelDto } from './dtos/create-car-model.dto';
import { CreationAttributes, Op, WhereOptions } from 'sequelize';
import { UpdateCarModelDto } from './dtos/update-car-model.dto';
import { CarModelQueryFindAll } from './dtos/types';

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

  async findAll(query: CarModelQueryFindAll) {
    const {
      limit,
      page,
      car_model_id,
      describe,
      year_initial,
      year_final,
      price,
      active,
      brand_id,
    } = query;
    const offset = (page - 1) * limit;

    const where: WhereOptions<CarModel> = {};

    if (car_model_id) where.car_model_id = car_model_id;

    if (describe) where.describe = { [Op.iLike]: `%${describe}%` };

    if (year_initial) where.year = { [Op.gte]: Number(year_initial) };
    if (year_final) where.year = { [Op.lte]: Number(year_final) };

    if (price) where.price = Number(price);

    if (active) where.active = active === 'true' ? true : false;

    if (brand_id) where.brand_id = brand_id;

    return await this.carModelModel.findAll({
      limit,
      offset,
      where,
    });
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
