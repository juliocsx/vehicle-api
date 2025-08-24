import { ApiProperty } from "@nestjs/swagger";
import { IsBooleanString, IsNumberString, IsOptional, IsString } from "class-validator";

export class CarModelQueryDto {
    @ApiProperty({ example: "a10331a7-21a5-4115-971e-7708ae37dc80" })
    @IsString()
    @IsOptional()
    car_model_id?: string;

    @ApiProperty({ example: "320i" })
    @IsString()
    @IsOptional()
    describe?: string;

    @ApiProperty({ example: 1998 })
    @IsString()
    @IsOptional()
    year_initial?: string;

    @ApiProperty({ example: 2025 })
    @IsString()
    @IsOptional()
    year_final?: string;

    @ApiProperty({ example: 500000 })
    @IsNumberString()
    @IsOptional()
    price?: string;

    @ApiProperty({ example: true })
    @IsBooleanString()
    @IsOptional()
    active?: string;

    @ApiProperty({ example: "a10331a7-21a5-4115-971e-7708ae37dc80" })
    @IsString()
    @IsOptional()
    brand_id?: string;
}