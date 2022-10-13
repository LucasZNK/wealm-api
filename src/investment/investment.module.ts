import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvestmentResolver } from './investment.resolver';
import { Investment, InvestmentSchema } from './investment.schema';
import { InvestmentService } from './investment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Investment.name, schema: InvestmentSchema },
    ]),
  ],
  providers: [InvestmentResolver, InvestmentService],
})
export class InvestmentModule {}
