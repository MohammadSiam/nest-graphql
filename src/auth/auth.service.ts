import {
  BadRequestException,
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
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './utils.password-hash';
import { CreateUserInput } from 'src/users/dto/create-user.input';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private userService: UsersService,
    private jwtService: JwtService,
    private passwordService: PasswordService
  ) { }

  async validateUser(strName: string, strPassword: string) {
    const user: any = await this.userService.findByUserName(strName);
    if (user && user.password === strPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginUserInput: LoginUserInput) {
    const { strName, strPassword } = loginUserInput;
    const user: any = await this.userService.findByUserName(
      loginUserInput.strName,
    );
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (strPassword == user.strPassword && strName == user.strName) {
      const payload = { strName: user.strName, strEmail: user.strEmail };
      const token = this.jwtService.sign(payload);
      return { access_token: token };
    }
  }

  async signup(createAuthInput: CreateUserInput) {
    try {
      // const authInfo = await this.authRepository.findOne({ where: { strPhone: createAuthInput.strPhone } });
      // if (authInfo) throw new BadRequestException('could not create user');
      const isUserEmailExist = await this.authRepository.findOne({ where: { strEmail: createAuthInput.strEmail } })
      if (isUserEmailExist) throw new UnauthorizedException('Email already exist')

      const isUserPhoneExist = await this.authRepository.findOne({ where: { strPhone: createAuthInput.strPhone } })
      if (isUserPhoneExist) throw new UnauthorizedException('User already exist with this phone');
      const hashPassword = await this.passwordService.hashPassword(createAuthInput.strPassword)


      const user: any = await this.userService.findByUserName(
        createAuthInput.strName,
      );
      console.log(user.intId);
      if (user) {
        throw new UnauthorizedException('User already exists');
      }
      const newAuth = await this.authRepository.save(createAuthInput);
      if (!newAuth)
        throw new InternalServerErrorException('Could not create auth');
      const newUser = this.userService.create(createAuthInput);

      return newUser;
    } catch (error) {
      throw error;
    }

  }
}

// {
//   intUserId: user.intId,
//   strName: createAuthInput.strName,
//   strEmail: createAuthInput.strEmail,
//   strAddress: createAuthInput.strAddress,
//   strPassword: hashPassword,
//   strPhone: createAuthInput.strPhone
// }
