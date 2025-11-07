import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MaterialLotDocument = MaterialLot & Document;

@Schema({ timestamps: true })
export class MaterialLot {
  @Prop({ type: Types.ObjectId, ref: 'Shop', required: true })
  shopId: Types.ObjectId;

  @Prop({ required: true })
  lotNumber: string;

  @Prop({ required: true, enum: ['gold', 'silver', 'platinum', 'diamond', 'gemstone'] })
  materialType: string;

  @Prop({ required: true })
  purity: string; // e.g., "22K", "18K", "925"

  @Prop({ required: true })
  weight: number; // in grams

  @Prop({ required: true })
  unitPrice: number;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ type: Types.ObjectId, ref: 'Supplier' })
  supplierId?: Types.ObjectId;

  @Prop()
  purchaseDate: Date;

  @Prop({ default: 'available', enum: ['available', 'allocated', 'used'] })
  status: string;

  @Prop()
  description?: string;

  @Prop({ type: Object })
  metadata?: Record<string, any>;
}

export const MaterialLotSchema = SchemaFactory.createForClass(MaterialLot);

