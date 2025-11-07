import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaxDocument = Tax & Document;

@Schema({ timestamps: true })
export class Tax {
  @Prop({ type: Types.ObjectId, ref: 'Shop', required: true })
  shopId: Types.ObjectId;

  @Prop({ required: true })
  taxName: string;

  @Prop({ required: true })
  taxRate: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const TaxSchema = SchemaFactory.createForClass(Tax);

