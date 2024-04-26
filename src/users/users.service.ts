import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const user = await this.userRepository.create(createUserInput);
    if (!user) throw new InternalServerErrorException('Could not create user');
    const savedUser = await this.userRepository.save(user);
    if (!savedUser)
      throw new InternalServerErrorException('Could not saved user');
    return savedUser;
  }

  async findAll() {
    try {
      const userInfo = await this.userRepository.find();
      if (!userInfo) throw new NotFoundException('users not found');
      return userInfo;
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {}

  async findByUserName(name: string) {
    try {
      const userInfo = await this.userRepository.findOneBy({ strName: name });
      return userInfo;
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  async removeUser(id: number) {
    try {
      const userInfo = await this.userRepository.findOneBy({ intId: id });
      if (!userInfo) throw new NotFoundException('User not found');
      return userInfo;
    } catch (error) {
      throw error;
    }
  }
}
