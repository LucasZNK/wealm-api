import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateInvestmentInput, Investment } from './investment.schema';
import { InvestmentService } from './investment.service';
import { InvestmentType } from './investment.type';

@Resolver((of) => Investment)
export class InvestmentResolver {
  constructor(private investmentService: InvestmentService) {}

  @Query(() => [Investment])
  async getInvestment() {
    return this.investmentService.getInvestment();
  }

  @Mutation(() => Investment)
  async createInvestment(@Args('input') investment: CreateInvestmentInput) {
    return this.investmentService.createInvestment(investment);
  }
}
