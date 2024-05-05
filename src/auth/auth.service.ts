import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
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
import { compare } from 'bcrypt';
import { UpdateAuthInput } from './dto/update-auth.input';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private jwtService: JwtService,
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
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
    const passwordMatch: any = await compare(strPassword, user.strPassword);
    if (!passwordMatch) throw new BadRequestException('Password did not match');
    if (passwordMatch && strName == user.strName) {
      const payload = { strName: user.strName, strEmail: user.strEmail };
      const token = this.jwtService.sign(payload);
      return { access_token: token };
    }
  }

  async signup(createAuthInput: CreateUserInput) {
    try {
      const isUserEmailExist = await this.authRepository.findOne({ where: { strEmail: createAuthInput.strEmail } })
      if (isUserEmailExist) throw new UnauthorizedException('Email already exist')

      const isUserPhoneExist = await this.authRepository.findOne({ where: { strPhone: createAuthInput.strPhone } })
      if (isUserPhoneExist) throw new UnauthorizedException('User already exist with this phone');
      const hashPassword = await this.passwordService.hashPassword(createAuthInput.strPassword)


      const user: any = await this.userService.findByUserName(
        createAuthInput.strName,
      );
      createAuthInput = {
        ...createAuthInput,
        strPassword: hashPassword
      }
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

  async updateAuth(id: number, updateAuthInput: UpdateAuthInput) {
    const auth = await this.authRepository.findOneBy({ intUserId: id });
    if (!auth) throw new NotFoundException('User not found');
    try {
      updateAuthInput = {
        ...updateAuthInput,
        dteUpdatedAt: new Date(),
      }
      const authInfo = await this.authRepository.save({
        ...auth,
        ...updateAuthInput
      })
      if (!authInfo) throw new InternalServerErrorException('Could not update auth info');
      return authInfo;
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
