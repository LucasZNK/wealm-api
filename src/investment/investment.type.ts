import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Investment')
export class InvestmentType {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;
}
