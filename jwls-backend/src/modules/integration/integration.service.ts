import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Integration, IntegrationDocument } from './schemas/integration.schema';

@Injectable()
export class IntegrationService {
  constructor(
    @InjectModel(Integration.name)
    private integrationModel: Model<IntegrationDocument>,
  ) {}

  async findAll(shopId: string): Promise<Integration[]> {
    return this.integrationModel.find({ shopId }).exec();
  }
}

