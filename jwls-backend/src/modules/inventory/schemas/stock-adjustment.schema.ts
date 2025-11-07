import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StockAdjustmentDocument = StockAdjustment & Document;

@Schema({ timestamps: true })
export class StockAdjustment {
  @Prop({ type: Types.ObjectId, ref: 'Shop', required: true })
  shopId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Item', required: true })
  itemId: Types.ObjectId;

  @Prop({ required: true })
  adjustmentQuantity: number;

  @Prop({ required: true })
  reason: string;

  @Prop({ required: true })
  adjustmentDate: Date;
}

export const StockAdjustmentSchema = SchemaFactory.createForClass(StockAdjustment);

