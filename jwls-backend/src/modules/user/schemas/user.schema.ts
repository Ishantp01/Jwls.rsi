import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserRole } from '../../../common/constants/roles.constant';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phone?: string;

  @Prop({ type: Types.ObjectId, ref: 'Shop' })
  shopId?: Types.ObjectId;

  @Prop({ type: [String], enum: UserRole, default: [UserRole.STAFF] })
  roles: UserRole[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  lastLogin?: Date;

  @Prop()
  avatar?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

