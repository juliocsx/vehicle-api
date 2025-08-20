import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  describe: string;
}