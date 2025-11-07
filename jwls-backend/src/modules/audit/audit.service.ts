import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActivityLog, ActivityLogDocument } from './schemas/activity-log.schema';

@Injectable()
export class AuditService {
  constructor(
    @InjectModel(ActivityLog.name)
    private activityLogModel: Model<ActivityLogDocument>,
  ) {}

  async findAll(shopId: string): Promise<ActivityLog[]> {
    return this.activityLogModel.find({ shopId }).populate('userId').exec();
  }

  async create(logData: any): Promise<ActivityLog> {
    const log = new this.activityLogModel(logData);
    return log.save();
  }
}

