import { Module } from '@nestjs/common';
import { CarModelService } from './car-model.service';
import { CarModelController } from './car-model.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarModel } from './car-model.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([CarModel])
  ],
  providers: [CarModelService],
  controllers: [CarModelController]
})
export class CarModelModule {}
