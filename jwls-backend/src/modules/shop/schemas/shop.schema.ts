import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ShopDocument = Shop & Document;

@Schema({ timestamps: true })
export class Shop {
  @Prop({ required: true, unique: true })
  subdomain: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  logo?: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phone?: string;

  @Prop()
  address?: string;

  @Prop()
  city?: string;

  @Prop()
  state?: string;

  @Prop()
  country?: string;

  @Prop()
  pincode?: string;

  @Prop()
  gstNumber?: string;

  @Prop()
  panNumber?: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  planType?: string;

  @Prop()
  planExpiryDate?: Date;

  @Prop({ type: Object })
  settings?: {
    currency: string;
    timeZone: string;
    dateFormat: string;
    weightUnit: string;
  };
}

export const ShopSchema = SchemaFactory.createForClass(Shop);

