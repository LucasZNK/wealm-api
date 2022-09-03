import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput, User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async registerUser(user: CreateUserInput) {
    return this.userModel.create(user);
  }

  async findOne(username: string) {
    const user = await this.userModel.findOne({
      username: username,
    });
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
