import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vehicle } from './vehicle.entity';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { UpdateVehicleDto } from './dtos/update-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle) private readonly vehicleModel: typeof Vehicle,
  ) {}
  async createVehicle(data: CreateVehicleDto) {
    const createdVehicle = await this.vehicleModel.create(data);
    return createdVehicle;
  }

  async findAll() {
    return await this.vehicleModel.findAll();
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
