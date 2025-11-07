import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobOrder, JobOrderDocument } from './schemas/job-order.schema';

@Injectable()
export class JobService {
  constructor(
    @InjectModel(JobOrder.name) private jobModel: Model<JobOrderDocument>,
  ) {}

  async findAll(shopId: string): Promise<JobOrder[]> {
    return this.jobModel.find({ shopId }).exec();
  }
}

