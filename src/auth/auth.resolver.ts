import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { CreateAuthInput } from './dto/create-auth.input';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { Auth } from './entities/auth.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => LoginResponse)
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() Context,) {
    const userInfo = await this.authService.login(loginUserInput);
    return userInfo;
  }

  @Mutation(() => User)
  async signup(@Args('createUserInput') createAuthInput: CreateAuthInput) {
    return await this.authService.signup(createAuthInput);
  }


}
