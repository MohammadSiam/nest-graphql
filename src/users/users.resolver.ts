import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { deleteResponse, updateResponse } from 'src/posts/entities/post.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  findAllUsers(@Context() context) {
    try {
      return this.usersService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => updateResponse)
  @UseGuards(JwtAuthGuard)
  async updateUser(@Args('id', { type: () => Int }) id: number, @Args('updateUserInput') updateUserInput: UpdateUserInput) {
    try {
      await this.usersService.updateUser(id, updateUserInput);
      return { message: 'User update successfully' };
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => deleteResponse)
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    try {
      await this.usersService.removeUser(id);
      return { message: 'Delete successfully' };
    } catch (error) {
      throw error;
    }
  }
}
