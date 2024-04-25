import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { CreateAuthInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { LoginResponse } from './dto/login-response';
import { User } from 'src/users/entities/user.entity';
import { LoginUserInput } from './dto/login-user.input';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => LoginResponse)
  login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.login(loginUserInput);
  }

  @Mutation(() => User)
  signup(@Args('createUserInput') createAuthInput: CreateAuthInput) {
    return this.authService.signup(createAuthInput);
  }
}
