import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type IntegrationDocument = Integration & Document;

@Schema({ timestamps: true })
export class Integration {
  @Prop({ type: Types.ObjectId, ref: 'Shop', required: true })
  shopId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: ['payment', 'accounting', 'inventory', 'ecommerce'] })
  type: string;

  @Prop({ type: Object })
  config?: Record<string, any>;

  @Prop({ default: true })
  isActive: boolean;
}

export const IntegrationSchema = SchemaFactory.createForClass(Integration);

