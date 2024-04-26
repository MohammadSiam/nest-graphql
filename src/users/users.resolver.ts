import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { deleteResponse } from 'src/posts/entities/post.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User])
  findAllUsers() {
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

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
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
