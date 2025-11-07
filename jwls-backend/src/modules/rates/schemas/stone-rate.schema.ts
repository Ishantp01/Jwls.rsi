import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StoneRateDocument = StoneRate & Document;

@Schema({ timestamps: true })
export class StoneRate {
  @Prop({ type: Types.ObjectId, ref: 'Shop', required: true })
  shopId: Types.ObjectId;

  @Prop({ required: true })
  stoneType: string;

  @Prop()
  quality?: string;

  @Prop({ required: true })
  ratePerCarat: number;

  @Prop({ required: true })
  effectiveDate: Date;
}

export const StoneRateSchema = SchemaFactory.createForClass(StoneRate);

