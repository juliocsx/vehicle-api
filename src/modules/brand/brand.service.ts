import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Brand } from './brand.entity';
import { CreateBrandDto } from './dtos/create-brand.dto';
import { UpdateBrandDto } from './dtos/update-brand.dto';
import { BrandQueryFindAll } from './dtos/types';
import { Op, WhereOptions } from 'sequelize';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand)
    private readonly brandModel: typeof Brand,
  ) {}

  async create(data: CreateBrandDto) {
    const existingBrand = await this.brandModel.findOne({
      where: { describe: data.describe },
    });

    if (existingBrand) {
      throw new HttpException('Marca ja cadastrada', HttpStatus.BAD_REQUEST);
    }

    const createdBrand = await this.brandModel.create(data);

    return createdBrand;
  }

  async findAll(query: BrandQueryFindAll) {
    const { limit, page, brand_id, describe } = query;
    const offset = (page - 1) * limit;

    const where: WhereOptions<Brand> = {};

    if (brand_id) where.brand_id = brand_id;

    if (describe) where.describe = { [Op.iLike]: `%${describe}%` };

    return await this.brandModel.findAll({
      limit,
      offset,
      where,
    });
  }

  async update(id: string, data: UpdateBrandDto) {
    const existingBrand = await this.brandModel.findOne({
      where: { describe: data.describe },
    });

    if (existingBrand) {
      throw new HttpException('Marca ja cadastrada', HttpStatus.BAD_REQUEST);
    }

    const updatedBrand = await this.brandModel.update(
      { ...data },
      { where: { brand_id: id }, returning: true },
    );

    return updatedBrand[1][0];
  }

  async delete(id: string) {
    return await this.brandModel.destroy({ where: { id } });
  }
}
