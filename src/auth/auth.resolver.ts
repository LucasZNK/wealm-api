import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateUserInput, User } from './user.schema';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  async signUp(@Args('input') user: CreateUserInput): Promise<User> {
    return this.authService.signUpUser(user);
  }
}
