import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SaleDocument = Sale & Document;

@Schema({ timestamps: true })
export class Sale {
  @Prop({ type: Types.ObjectId, ref: 'Shop', required: true })
  shopId: Types.ObjectId;

  @Prop({ required: true, unique: true })
  invoiceNumber: string;

  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
  customerId: Types.ObjectId;

  @Prop({ required: true })
  saleDate: Date;

  @Prop({ type: [{ itemId: Types.ObjectId, quantity: Number, price: Number }] })
  items: { itemId: Types.ObjectId; quantity: number; price: number }[];

  @Prop({ required: true })
  subtotal: number;

  @Prop({ default: 0 })
  discount: number;

  @Prop({ default: 0 })
  tax: number;

  @Prop({ required: true })
  total: number;

  @Prop({ default: 0 })
  amountPaid: number;

  @Prop({ default: 0 })
  balanceAmount: number;

  @Prop({ default: 'pending', enum: ['pending', 'completed', 'cancelled'] })
  status: string;

  @Prop({ enum: ['cash', 'card', 'upi', 'bank_transfer', 'partial'] })
  paymentMethod: string;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);

