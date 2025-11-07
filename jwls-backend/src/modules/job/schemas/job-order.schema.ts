import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type JobOrderDocument = JobOrder & Document;

@Schema({ timestamps: true })
export class JobOrder {
  @Prop({ type: Types.ObjectId, ref: 'Shop', required: true })
  shopId: Types.ObjectId;

  @Prop({ required: true, unique: true })
  jobNumber: string;

  @Prop({ type: Types.ObjectId, ref: 'Customer' })
  customerId?: Types.ObjectId;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: ['pending', 'in_progress', 'completed', 'delivered'] })
  status: string;

  @Prop()
  estimatedDeliveryDate?: Date;

  @Prop()
  actualDeliveryDate?: Date;

  @Prop({ default: 0 })
  estimatedCost: number;
}

export const JobOrderSchema = SchemaFactory.createForClass(JobOrder);

