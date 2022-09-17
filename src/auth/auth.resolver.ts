import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/user.schema';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver((of) => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  signinpLocal(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context, // Context get the user from the Guard!
  ) {
    return this.authService.signinLocal(context.user);
  }

  @Mutation(() => User)
  signUpLocal(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.signupLocal(loginUserInput);
  }

  @Mutation(() => User)
  logout(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.logout();
  }

  @Mutation(() => User)
  refreshTokens(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.refreshTokens(loginUserInput);
  }
}
