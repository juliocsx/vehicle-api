import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vehicle } from './vehicle.entity';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { UpdateVehicleDto } from './dtos/update-vehicle.dto';
import { VehicleQueryFindAll } from './dtos/types';
import { Op, WhereOptions } from 'sequelize';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle) private readonly vehicleModel: typeof Vehicle,
  ) {}
  async createVehicle(data: CreateVehicleDto) {
    const createdVehicle = await this.vehicleModel.create(data);
    return createdVehicle;
  }

  async findAll(query: VehicleQueryFindAll) {
    const {
      limit,
      page,
      vehicle_id,
      license_plate,
      color,
      manufacture_year,
      mileage_initial,
      mileage_final,
      user_id,
    } = query;
    const offset = (page - 1) * limit;

    const where: WhereOptions<Vehicle> = {};

    if (vehicle_id) where.vehicle_id = vehicle_id;

    if (license_plate) where.license_plate = { [Op.iLike]: `%${license_plate}%` };

    if (color) where.color = { [Op.iLike]: `%${color}%` };

    if (manufacture_year) where.manufacture_year = manufacture_year;

    if (mileage_initial) where.mileage = { [Op.gte]: Number(mileage_initial) };
    if (mileage_final) where.mileage = { [Op.lte]: Number(mileage_final) };

    if (user_id) where.user_id = user_id;

    return await this.vehicleModel.findAll({
      limit,
      offset,
      where,
    });
  }

  async update(id: string, data: UpdateVehicleDto) {
    const updatedVehicle = await this.vehicleModel.update(data, {
      where: { id },
    });
    return updatedVehicle;
  }

  async delete(id: string) {
    return await this.vehicleModel.destroy({ where: { id } });
  }
}
