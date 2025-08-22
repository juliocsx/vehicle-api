import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateBrandDto } from './dtos/create-brand.dto';
import { UpdateBrandDto } from './dtos/update-brand.dto';
import { BrandService } from './brand.service';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  async create(@Body() data: CreateBrandDto) {
    return await this.brandService.create(data);
  }

  @Get()
  async findAll() {
    return await this.brandService.findAll();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateBrandDto,
  ) {
    return await this.brandService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.brandService.delete(id);
  }
}
