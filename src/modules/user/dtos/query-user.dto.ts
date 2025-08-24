import { ApiProperty } from "@nestjs/swagger";
import { IsBooleanString, IsOptional, IsString } from "class-validator";

export class UserQueryDto {
    @ApiProperty({ example: "a10331a7-21a5-4115-971e-7708ae37dc80" })
    @IsString()
    @IsOptional()
    user_id?: string;

    @ApiProperty({ example: "arkeron" })
    @IsString()
    @IsOptional()
    username?: string;

    @ApiProperty({ example: "edmilson@gmail.com" })
    @IsString()
    @IsOptional()
    email?: string;

    @ApiProperty({ example: true })
    @IsBooleanString()
    @IsOptional()
    active?: string;
}