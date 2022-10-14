import { Tokens } from './types/tokens.type';
import { CreateUserInput, UserDocument } from './../users/user.schema';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { User } from 'src/users/user.schema';
import { UsersService } from 'src/users/users.service';
import { UserSecured } from './dto/login-response';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './dto/login-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService implements OnModuleDestroy, OnModuleInit {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  onModuleDestroy() {}

  onModuleInit() {}

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

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

  async registerLocal(userInfo: CreateUserInput): Promise<Tokens> {
    const user = await this.userService.findOne(userInfo.email);
    const hashedPassword = await this.hashData(userInfo.password);

    if (user) {
      throw new Error('User already exists');
    }

    const newUser = this.userModel.create({
      ...userInfo,
      password: hashedPassword,
    });
    // Investigate how to manage unique usernames mongoose
  }

  async logout() {}

  async refreshTokens(loginUserInput: LoginUserInput) {}
}
