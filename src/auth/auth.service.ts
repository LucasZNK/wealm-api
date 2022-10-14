import { CreateUserInput, UserDocument } from './../users/user.schema';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { User } from 'src/users/user.schema';
import { UsersService } from 'src/users/users.service';
import { UserSecured } from './dto/login-response';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './dto/login-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService implements OnModuleDestroy, OnModuleInit {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
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

  async loginLocal(user: UserSecured) {
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user._id,
      }),
      user,
    };
  }

  async registerUser(userInfo: CreateUserInput) {
    const user = await this.userService.findOne(userInfo.email);
    if (user) {
      throw new Error('User already exists');
    }

    return this.userModel.create(userInfo);
    // Investigate how to manage unique usernames mongoose
  }

  async logout() {}

  async refreshTokens(loginUserInput: LoginUserInput) {}
}
