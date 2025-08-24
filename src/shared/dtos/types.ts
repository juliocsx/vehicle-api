import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString,  } from 'class-validator';

export class PaginationQuery {
  @ApiProperty({ example: 1 })
  @IsNumberString()
  @IsNotEmpty()
  page: number;

  @ApiProperty({ example: 20 })
  @IsNumberString()
  @IsNotEmpty()
  limit: number;
}
