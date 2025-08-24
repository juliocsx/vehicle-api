import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsOptional, IsString } from "class-validator";

export class VehicleQueryDto {
    @ApiProperty({ example: "a10331a7-21a5-4115-971e-7708ae37dc80" })
    @IsString()
    @IsOptional()
    vehicle_id?: string;

    @ApiProperty({ example: "LSN4I49" })
    @IsString()
    @IsOptional()
    license_plate?: string;

    @ApiProperty({ example: "Vermelho Ferrari" })
    @IsString()
    @IsOptional()
    color?: string;

    @ApiProperty({ example: "2001" })
    @IsString()
    @IsOptional()
    manufacture_year?: string;

    @ApiProperty({ example: 20000 })
    @IsNumberString()
    @IsOptional()
    mileage_initial?: string;

    @ApiProperty({ example: 20000 })
    @IsNumberString()
    @IsOptional()
    mileage_final?: string;

    @ApiProperty({ example: "a10331a7-21a5-4115-971e-7708ae37dc80" })
    @IsString()
    @IsOptional()
    user_id?: string
}