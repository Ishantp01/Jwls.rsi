import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type InventoryTransactionDocument = InventoryTransaction & Document;

@Schema({ timestamps: true })
export class InventoryTransaction {
  @Prop({ type: Types.ObjectId, ref: 'Shop', required: true })
  shopId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Item', required: true })
  itemId: Types.ObjectId;

  @Prop({ required: true, enum: ['in', 'out', 'transfer', 'adjustment'] })
  transactionType: string;

  @Prop({ required: true })
  quantity: number;

  @Prop()
  reason?: string;

  @Prop({ required: true })
  transactionDate: Date;
}

export const InventoryTransactionSchema = SchemaFactory.createForClass(InventoryTransaction);

