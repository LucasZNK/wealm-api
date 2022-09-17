import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { User } from 'src/users/user.schema';
import { UsersService } from 'src/users/users.service';
import { UserSecured } from './dto/login-response';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class AuthService implements OnModuleDestroy, OnModuleInit {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  onModuleDestroy() {}

  onModuleInit() {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Partial<User>> {
    const user = await (<User>(
      (await this.userService.findOne(username)).toJSON()
    ));

    if (user && user.password === password) {
      // Add bcrypt hashing
      const { password, ...securedUser } = user;

      return securedUser;
    }

    return null;
  }

  async signinLocal(user: UserSecured) {
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user._id,
      }),
      user,
    };
  }

  async signupLocal(loginUserInput: LoginUserInput) {
    const user = await this.userService.findOne(loginUserInput.username);
    if (user) {
      throw new Error('User already exists');
    }
    // Investigate how to manage unique usernames mongoose
  }

  async signInLocal(loginUserInput: LoginUserInput) {
    // Investigate how to manage unique usernames mongoose
  }

  async logout() {}

  async refreshTokens(loginUserInput: LoginUserInput) {}
}
