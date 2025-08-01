import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { UserService } from './modules/user/user.service';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { BrandModule } from './modules/brand/brand.module';
import { CarModelModule } from './modules/car-model/car-model.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UserModule, VehicleModule, BrandModule, CarModelModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
