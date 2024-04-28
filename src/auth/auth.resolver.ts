import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { CreateAuthInput } from './dto/create-auth.input';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { Auth } from './entities/auth.entity';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    const userInfo = await this.authService.login(loginUserInput);
    if (userInfo) return { access_token: 'successfully login' };
  }

  @Mutation(() => User)
  signup(@Args('createUserInput') createAuthInput: CreateAuthInput) {
    return this.authService.signup(createAuthInput);
  }
}
