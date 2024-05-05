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
import { Auth } from 'src/auth/entities/auth.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService,
  ) { }

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

  findOne(id: number) { }

  async findByUserName(name: string) {
    try {
      const userInfo = await this.userRepository.findOne({ where: { strName: name } });
      return userInfo;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: number, updateUserInput: UpdateUserInput) {
    const user = await this.userRepository.findOneBy({ intId: id });
    if (!user) throw new NotFoundException('user not found');
    try {
      updateUserInput = {
        ...updateUserInput,
        dteUpdatedAt: new Date()
      }
      const userInfo = await this.userRepository.save({
        ...user,
        ...updateUserInput,
      });
      if (!userInfo) throw new InternalServerErrorException('Could not update user');
      const updateAuth = await this.authService.updateAuth(id, updateUserInput);
      return userInfo;
    } catch (error) {
      throw error;
    }
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
