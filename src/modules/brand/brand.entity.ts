import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { CreateBrandDto } from './dtos/create-brand.dto';

@Table({
  tableName: 'brand',
  timestamps: true,
})
export class Brand extends Model<Brand, CreateBrandDto> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public brand_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  describe: string;
}
