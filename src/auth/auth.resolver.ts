import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { CreateUserInput, User } from '../users/user.schema';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async registerLocal(@Args('input') user: CreateUserInput): Promise<User> {
    return this.authService.registerUser(user);
  }

  loginLocal(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context, // Context get the user from the Guard!
  ) {
    return this.authService.loginLocal(context.user);
  }

  @Mutation(() => User)
  logout() {
    return this.authService.logout();
  }

  @Mutation(() => User)
  refreshTokens(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.refreshTokens(loginUserInput);
  }
}
