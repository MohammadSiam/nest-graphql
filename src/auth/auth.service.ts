import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { CreateAuthInput } from './dto/create-auth.input';
import { LoginUserInput } from './dto/login-user.input';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private userService: UsersService,
  ) {}

  async signup(createAuthInput: CreateAuthInput) {
    const user: any = await this.userService.findByUserName(
      createAuthInput.strName,
    );
    if (user) {
      throw new UnauthorizedException('User already exists');
    }
    const newUser = this.userService.create(createAuthInput);
    return newUser;
  }

  async login(loginUserInput: LoginUserInput) {
    const { strName, strPassword } = loginUserInput;
    const user: any = await this.userService.findByUserName(
      loginUserInput.strName,
    );
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (strPassword == user.strPassword) {
      return user;
    }
  }
}
