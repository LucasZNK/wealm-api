import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await (await this.userService.findOne(username)).toJSON();

    if (user && user.password === password) {
      // Add bcrypt hashing
      const { password, ...result } = user;
      console.log(result);
      return result;
    }

    return null;
  }

  async login(user: User) {
    return {
      access_token: 'jwt',
      user,
    };
  }
}
