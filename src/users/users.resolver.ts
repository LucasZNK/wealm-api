import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
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
  async findAll() {
    // REVISAR ESTE METODO
    return [];
    // return this.userService.findAll();
  }
}
