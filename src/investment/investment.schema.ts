import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type InvestmentDocument = Investment & mongoose.Document;

@Schema()
@ObjectType()
export class Investment {
  @Field(() => ID)
  _id: number;

  @Prop({ required: true })
  @Field()
  title: string;

  @Prop({ required: true })
  @Field()
  description: string;
}

export const InvestmentSchema = SchemaFactory.createForClass(Investment);

@InputType()
export class CreateInvestmentInput {
  @Field()
  title: string;

  @Field()
  description: string;
}
