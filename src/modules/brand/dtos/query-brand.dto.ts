import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class BrandQueryDto {
    @ApiProperty({ example: "a10331a7-21a5-4115-971e-7708ae37dc80" })
    @IsString()
    @IsOptional()
    brand_id?: string;

    @ApiProperty({ example: "BMW" })
    @IsString()
    @IsOptional()
    describe?: string;
}