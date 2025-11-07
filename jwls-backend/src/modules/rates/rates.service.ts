import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MetalRate, MetalRateDocument } from './schemas/metal-rate.schema';
import { StoneRate, StoneRateDocument } from './schemas/stone-rate.schema';

@Injectable()
export class RatesService {
  constructor(
    @InjectModel(MetalRate.name) private metalRateModel: Model<MetalRateDocument>,
    @InjectModel(StoneRate.name) private stoneRateModel: Model<StoneRateDocument>,
  ) {}

  async findAllMetalRates(shopId: string): Promise<MetalRate[]> {
    return this.metalRateModel.find({ shopId }).exec();
  }

  async findAllStoneRates(shopId: string): Promise<StoneRate[]> {
    return this.stoneRateModel.find({ shopId }).exec();
  }
}

