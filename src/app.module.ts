import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { InvestmentModule } from './investment/investment.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      driver: ApolloDriver,
    }),
    MongooseModule.forRoot('mongodb://localhost/investment'),
    InvestmentModule,
  ],
})
export class AppModule {}
