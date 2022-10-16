import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login-user.input';
import { CreateUserInput, User } from '../users/user.schema';
import { RegisterUserResponse } from './dto/register-response';

@Resolver(() => RegisterUserResponse)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => RegisterUserResponse)
  async registerLocal(
    @Args('input') user: CreateUserInput,
  ): Promise<RegisterUserResponse> {
    return this.authService.registerLocal(user);
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
