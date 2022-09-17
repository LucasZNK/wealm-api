import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput, User } from './user.schema';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Mutation(() => User)
  async registerUser(@Args('input') user: CreateUserInput): Promise<User> {
    return this.userService.registerUser(user);
  }

  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  async findAll(@Context() context) {
    // context has  the user , for example i can pass to get the user details
    return this.userService.findAll();
  }

  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  async getUserInfo() {
    // return this.getUserInfo(context.username)
  }
}
