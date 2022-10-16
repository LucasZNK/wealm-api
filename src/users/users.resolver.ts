import { Resolver, Query, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.schema';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Query(() => [User])
  // @UseGuards(JwtAuthGuard)
  async findAll(@Context() context) {
    return this.userService.findAll();
  }

  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  async getUserInfo() {
    // return this.getUserInfo(context.username)
  }
}
