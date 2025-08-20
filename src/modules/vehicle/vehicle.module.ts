import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vehicle } from './vehicle.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Vehicle])
  ],
  providers: [VehicleService],
  controllers: [VehicleController]
})
export class VehicleModule {}
