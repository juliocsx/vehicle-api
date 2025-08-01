import { Module } from '@nestjs/common';
import { CarModelService } from './car-model.service';
import { CarModelController } from './car-model.controller';

@Module({
  providers: [CarModelService],
  controllers: [CarModelController]
})
export class CarModelModule {}
