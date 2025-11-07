import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ type: Types.ObjectId, ref: 'Shop', required: true })
  shopId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Sale', required: true })
  saleId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
  customerId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, enum: ['cash', 'card', 'upi', 'bank_transfer', 'cheque'] })
  paymentMethod: string;

  @Prop({ required: true })
  paymentDate: Date;

  @Prop()
  transactionId?: string;

  @Prop()
  remarks?: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);

