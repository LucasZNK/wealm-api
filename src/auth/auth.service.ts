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

  /**
   * It creates a new user in the database, hashes the password, and returns a set of tokens
   * @param {CreateUserInput} userInfo - CreateUserInput
   * @returns Tokens
   */

  async registerLocal(userInfo: CreateUserInput): Promise<Tokens> {
    const user = await this.userModel.findOne({ email: userInfo.email });

    if (user) {
      throw new Error('User already exists');
    }
    const hashedPassword = await this.hashData(userInfo.password);

    const newUser = await this.userModel.create({
      ...userInfo,
      password: hashedPassword,
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRefreshTokenHash(newUser._id, tokens.refresh_token);
    return tokens;
  }

  async logout() {}

  async refreshTokens(loginUserInput: LoginUserInput) {}

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  /**
   * It returns a promise that resolves to an object containing two JWT tokens, one for access and one
   * for refresh
   * @param {number} userId - The user's ID
   * @param {string} email - The email address of the user.
   * @returns Tokens
   */

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'at-secret', // TODO : USE ENV VARIABLE
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'rt-secret', // TODO : USE ENV VARIABLE
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async updateRefreshTokenHash(_id: number, refreshToken: string) {
    const hash = await this.hashData(refreshToken);
    await this.userModel.findByIdAndUpdate(_id, {
      hashedRefreshToken: hash,
    });
  }

  /**
   * "If the user exists and the password matches, return the user
   * @param {string} email - string - The email of the user
   * @param {string} password - The password to validate.
   * @returns The user object with the password removed.
   */

  async validateUser(email: string, password: string): Promise<Partial<User>> {
    const user = await (<User>(await this.userService.findOne(email)).toJSON());

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
        email: user.email,
        sub: user._id,
      }),
      user,
    };
  }

  onModuleDestroy() {}

  onModuleInit() {}
}
