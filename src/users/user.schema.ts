import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsString, isString } from 'class-validator';
import mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;

@Schema()
@ObjectType()
export class User {
  @Field(() => ID)
  _id: number;

  @Prop({ required: true })
  @Field()
  username: string;

  @Prop({ required: true })
  @Field()
  email: string;

  @Prop({ required: true })
  @Field()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

@InputType()
export class CreateUserInput {
  @Prop({ required: true })
  @IsString()
  @Field()
  username: string;

  @Prop({ required: false })
  @Field()
  @IsEmail()
  email: string;

  @Prop({ required: true })
  @IsString()
  @Field()
  password: string;
}
