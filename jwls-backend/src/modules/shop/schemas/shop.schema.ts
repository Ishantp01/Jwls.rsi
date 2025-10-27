import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type shopDocument = Shop & Document;

@Schema({timestamps: true})
export class Shop {
    @Prop({required: true, unique: true})
    name: string;

    @Prop({required: true, unique: true})
    subDomain: string;

    @Prop()
    customeDomain?: string;

    @Prop({required: true})
    status: string;

    @Prop({type: Date, default: null})
    subscriptonExpiresAt?: Date;

    @Prop()
    contactEmail?: string;

    @Prop()
    contactPhone?: string;

    @Prop({type: Object, default: {}})
    meta?: Record<string, any>;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);