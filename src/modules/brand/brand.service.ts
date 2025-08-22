import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Brand } from './brand.entity';
import { CreateBrandDto } from './dtos/create-brand.dto';
import { UpdateBrandDto } from './dtos/update-brand.dto';

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

  async findAll() {
    return await this.brandModel.findAll();
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
