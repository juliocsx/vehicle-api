import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateBrandDto } from './dtos/create-brand.dto';
import { UpdateBrandDto } from './dtos/update-brand.dto';
import { BrandService } from './brand.service';
import { AuthGuard } from '../auth/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationQuery } from 'src/shared/dtos/types';
import { BrandQueryDto } from './dtos/query-brand.dto';

@ApiTags('Brand')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @ApiOperation({ summary: 'Registra uma nova Marca' })
  @ApiResponse({
    status: 201,
    description: 'Marca registrada com sucesso.',
  })
  async create(@Body() data: CreateBrandDto) {
    return await this.brandService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Lista Todos os Marcas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de marcas retornada com sucesso.',
  })
  async findAll(
    @Query() query: BrandQueryDto,
    @Query() pagination: PaginationQuery,
  ) {
    return await this.brandService.findAll({ ...query, ...pagination });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza o Marca apartir do user_id' })
  @ApiParam({ name: 'id', description: 'id da Marca' })
  @ApiResponse({
    status: 200,
    description: 'Marca atualizada com sucesso.',
  })
  async update(@Param('id') id: string, @Body() data: UpdateBrandDto) {
    return await this.brandService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui o Marca apartir do user_id' })
  @ApiParam({ name: 'id', description: 'id da Marca' })
  @ApiResponse({
    status: 204,
    description: 'Marca excluida com sucesso.',
  })
  async delete(@Param('id') id: string) {
    return await this.brandService.delete(id);
  }
}
