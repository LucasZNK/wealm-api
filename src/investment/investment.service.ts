import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateInvestmentInput, Investment, InvestmentDocument } from './investment.schema';

@Injectable()
export class InvestmentService {
   constructor(@InjectModel(Investment.name) private investmentModel:Model<InvestmentDocument>){}

   async findMany(){
    return this.investmentModel.find().lean()
   }

   async findById(id:string){
        return this.investmentModel.findById(id).lean()
   }

   async createInvestment(investment:CreateInvestmentInput){
        return this.investmentModel.create(investment);
   }
}

