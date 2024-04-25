import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginUserInput } from '../auth/dto/login-user.input';
import { Auth } from 'src/auth/entities/auth.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createUserInput: CreateUserInput) {
    const user = await this.userRepository.create(createUserInput)
    if (!user) throw new InternalServerErrorException('Could not create user')
    const savedUser = await this.userRepository.save(user);
    if (!savedUser) throw new InternalServerErrorException('Could not saved user');
    return savedUser;
  }



  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {

  }

  async findByUserName(name: string) {
    try {
      const userInfo = await this.userRepository.findOneBy({ strName: name })
      return userInfo;
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
