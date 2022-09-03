import { Field, ObjectType, OmitType, PartialType } from '@nestjs/graphql';
import { User } from 'src/users/user.schema';

@ObjectType()
export class UserSecured extends PartialType(
  OmitType(User, ['password'] as const),
) {}

@ObjectType()
export class LoginResponse {
  @Field()
  access_token: string;

  @Field(() => UserSecured)
  user: UserSecured;
}
