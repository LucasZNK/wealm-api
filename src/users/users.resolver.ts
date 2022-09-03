import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput, User } from './user.schema';

@Resolver(() => User)
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Mutation(() => User)
  async registerUser(@Args('input') user: CreateUserInput): Promise<User> {
    return this.userService.registerUser(user);
  }
}
