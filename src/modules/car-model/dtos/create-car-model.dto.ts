import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCarModelDto {
  @IsNotEmpty()
  @IsString()
  describe: string;

  @IsNotEmpty()
  @IsString()
  year: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  brand_id: string;
}
