import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { UserQueryFindAll } from './dtos/types';
import { Op, WhereOptions } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(user: CreateUserDto) {
    await this.validateEmail(user.email);

    const createdUser = await this.userModel.create({
      ...user,
      password: bcryptHashSync(user.password, 10),
    });

    return createdUser;
  }

  async findAll(query: UserQueryFindAll) {
    const { limit, page, user_id, username, email, active } = query;
    const offset = (page - 1) * limit;

    const where: WhereOptions<User> = {};

    if (user_id) where.user_id = user_id;

    if (username) where.username = { [Op.iLike]: `%${username}%` };

    if (email) where.email = email;

    if (active) where.active = active === 'true' ? true : false;

    return await this.userModel.findAll({
      limit,
      offset,
      where,
    });
  }

  async update(id: string, user: UpdateUserDto) {
    if (user.email) {
      await this.validateEmail(user.email);
    }

    const updatedUser = await this.userModel.update(
      { ...user },
      { where: { user_id: id }, returning: true },
    );

    return updatedUser[1][0];
  }

  async validateEmail(email: string) {
    const emailAlreadyExists = await this.userModel.findOne({
      where: { email: email },
    });

    if (emailAlreadyExists) {
      throw new HttpException(
        'Esse email já está em uso',
        HttpStatus.BAD_REQUEST,
      );
    }

    return true;
  }

  async findByUsername(username: string) {
    const user = await this.userModel.findOne({
      where: { username: username },
    });

    return user;
  }
}
