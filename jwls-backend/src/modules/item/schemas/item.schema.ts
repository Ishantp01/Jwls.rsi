import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema({ timestamps: true })
export class Item {
  @Prop({ type: Types.ObjectId, ref: 'Shop', required: true })
  shopId: Types.ObjectId;

  @Prop({ required: true, unique: true })
  itemCode: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: ['ring', 'necklace', 'bracelet', 'earring', 'pendant', 'other'] })
  category: string;

  @Prop()
  description?: string;

  @Prop({ type: [String] })
  images?: string[];

  @Prop({ required: true })
  grossWeight: number;

  @Prop()
  netWeight?: number;

  @Prop()
  stoneWeight?: number;

  @Prop({ required: true })
  purity: string;

  @Prop({ required: true })
  makingCharges: number;

  @Prop({ default: 0 })
  stoneCharges: number;

  @Prop()
  hsnCode?: string;

  @Prop({ required: true })
  sellingPrice: number;

  @Prop({ default: 'in_stock', enum: ['in_stock', 'sold', 'reserved', 'workshop'] })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'MaterialLot' })
  materialLotId?: Types.ObjectId;

  @Prop({ type: Object })
  stoneDetails?: {
    type: string;
    count: number;
    weight: number;
    quality: string;
  }[];
}

export const ItemSchema = SchemaFactory.createForClass(Item);

