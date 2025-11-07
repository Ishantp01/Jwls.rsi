import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MetalRateDocument = MetalRate & Document;

@Schema({ timestamps: true })
export class MetalRate {
  @Prop({ type: Types.ObjectId, ref: 'Shop', required: true })
  shopId: Types.ObjectId;

  @Prop({ required: true, enum: ['gold', 'silver', 'platinum'] })
  metalType: string;

  @Prop({ required: true })
  purity: string;

  @Prop({ required: true })
  ratePerGram: number;

  @Prop({ required: true })
  effectiveDate: Date;
}

export const MetalRateSchema = SchemaFactory.createForClass(MetalRate);

