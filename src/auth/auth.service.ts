import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateAuthInput } from './dto/create-auth.input';
import { LoginUserInput } from './dto/login-user.input';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private userService: UsersService,
  ) {}

  async login(loginUserInput: LoginUserInput) {
    const { strName, strPassword } = loginUserInput;
    const user: any = await this.userService.findByUserName(
      loginUserInput.strName,
    );
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (strPassword == user.strPassword && strName == user.strName) {
      return user;
    }
  }

  async signup(createAuthInput: CreateAuthInput) {
    const newAuth = this.authRepository.save(createAuthInput);
    if (!newAuth)
      throw new InternalServerErrorException('Could not create auth');
    const user: any = await this.userService.findByUserName(
      createAuthInput.strName,
    );
    if (user) {
      throw new UnauthorizedException('User already exists');
    }
    const newUser = this.userService.create(createAuthInput);

    return newUser;
  }
}
